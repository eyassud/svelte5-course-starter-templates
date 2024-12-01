import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code');

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    const sessionData = await supabase.auth.getSession();

    if (sessionData.data.session) {
        console.log(sessionData.data.session.user);

        const { data: existingUser, error: selectError } = await supabase.from('user_names')
            .select('name')
            .eq('user_id', sessionData.data.session.user.id)
            .single();

        if (selectError && selectError.code !== 'PGRST116')
            return new Response('Error fetching user data', { status: 500 });

        if (!existingUser) {
            const { error: insertError } = await supabase.from('user_names').insert([
                {
                    user_id: sessionData.data.session.user.id,
                    name: sessionData.data.session.user.user_metadata.name,
                }
            ]);

            if (insertError)
                return new Response('Error inserting user data', { status: 500 });
        }

        throw redirect(303, '/private/dashboard');
    }

    return new Response('Session data not found', { status: 400 });
}
