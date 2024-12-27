import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { Database } from "$lib/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ request }) => {
    const supabaseAdmin = createClient<Database>(
        PUBLIC_SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY);

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return json({
            status: 401,
            body: "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const { data: userData, error: verificationError } = await supabaseAdmin.auth.getUser(token);

        if (verificationError || !userData.user)
            return json({ error: "Invalid session" }, { status: 401 });

        const userId = userData.user.id;
        const { userName, email } = await request.json();

        const { error: updateError } = await supabaseAdmin
            .auth.admin.updateUserById(userId, { email });

        if (updateError)
            return json({ error: "Error updating email" }, { status: 500 });

        const {error: updateProfileError} = await supabaseAdmin.from("user_names").update({name: userName}).eq("user_id", userId);

        if (updateProfileError)
            return json({ error: "Error updating user name" }, { status: 500 });

        return json({ message: "Account updated" });

    } catch (error) {
        return json({ error: "An unexpected error" }, { status: 500 });
    }
}
