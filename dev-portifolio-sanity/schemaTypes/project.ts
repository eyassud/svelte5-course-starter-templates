import { defineField, defineType } from 'sanity';
export const project = defineType({
    name: 'project', title: 'Project', type: 'document', fields: [
        defineField({
            name: 'name',
            title: 'Project Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug - Ending of url to see the project work',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'date',
            title: 'When did you do this project?',
            type: 'date',
            validation: (Rule) => Rule.required(),
            options: {
                dateFormat: "YYYY-MM",
            }
        }),
        defineField({
            name: 'content',
            title: 'Project Content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'stack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
    ],
});