// sanity.js
import { createClient, type ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

const clientConfig: ClientConfig = {
  projectId: 'btyg29n4',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-11-09', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content or accessing previewDrafts perspective
};

export const sanityClient = createClient(clientConfig);

export function processProjectEntries(rawProject: SanityProject) {
  const builder = imageUrlBuilder(sanityClient);
  const projectImageUrl = builder.image(rawProject.image).url();

  const processedProject: ProcessedProject = {
    name: rawProject.name,
    company: rawProject.company,
    dateAccomplished: rawProject.date,
    stack: rawProject.stack,
    slug: rawProject.slug,
    projectImageUrl,
    content: rawProject.content.map(processProjectContent),
  }

  return processedProject;
}

function processProjectContent(content: RawTextContent | RawImageContent): ProcessedTextContent | ProcessedImageContent {
  if (content._type === 'block') {
    const processedTextContent: ProcessedTextContent = {
      type: 'text',
      style: content.style,
      textToRender: content.children.map(child => child.text).join('\n'),
    }

    return processedTextContent;
  } else {
    const builder = imageUrlBuilder(sanityClient);
    const projectImageUrl = builder.image(content).url();

    const processedImage : ProcessedImageContent = {
      type: 'image',
      image: projectImageUrl,
    }

    return processedImage;
  }
}