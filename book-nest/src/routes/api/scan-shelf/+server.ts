import { OPENAI_API_KEY } from "$env/static/private";
import { json, text, type RequestHandler } from "@sveltejs/kit";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const POST: RequestHandler = async ({ request }) => {
    const { base64 } = await request.json();

    // const response = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: [
    //         {
    //             role: "user",
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: `In the given image there will be either one or moe books displayed. What you need to do is give me back a JSON and NOTHING ELSE. What 
    //                             I need as information is the books that you can see on the image in this form:
    //                             {
    //                             bookTitle: "Harry Potter and the Deathly Hallows", author: "J. K. Rowling",
    //                             please also make sure you return an array, even if there is only one book visible in the image}`
    //                 }, {
    //                     type: "image_url",
    //                     image_url: {
    //                         url: `data:image/jpeg;base64,${base64}`,
    //                         detail: 'low'
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // });

    // console.log(response.choices[0]);
    // const bookArrayString = response.choices[0].message.content?.replace(/```json|```/g, "").trim();
    const bookArray = [
        {
            "bookTitle": "A Man Called Ove",
            "author": "Fredrik Backman"
        },
        {
            "bookTitle": "Harlem Shuffle",
            "author": "Colson Whitehead"
        },
        {
            "bookTitle": "The Bullet That Missed",
            "author": "Richard Osman"
        },
        {
            "bookTitle": "Lab Girl",
            "author": "Hope Jahren"
        },
        {
            "bookTitle": "The Whalebone Theatre",
            "author": "Joanna Quinn"
        },
        {
            "bookTitle": "Kitchens of the Great Midwest",
            "author": "J. Ryan Stradal"
        },
        {
            "bookTitle": "The Library Book",
            "author": "Susan Orlean"
        },
        {
            "bookTitle": "West with Giraffes",
            "author": "Lynda Rutledge"
        },
        {
            "bookTitle": "The Lost Bookshop",
            "author": "Evie Woods"
        }
    ]
    return json({ bookArray });
}