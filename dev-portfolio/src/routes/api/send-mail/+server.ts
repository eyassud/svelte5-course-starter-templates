import { json } from "@sveltejs/kit";

import type { RequestEvent } from "@sveltejs/kit";

export async function POST({ request }) {
    const data = await request.json();
    console.log(data);

    return json({ emailSentSuccessfully: true });
}