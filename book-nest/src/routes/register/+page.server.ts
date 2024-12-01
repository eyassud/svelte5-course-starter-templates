import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
    success: boolean;
    errors: string[];
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const actions = {
    default: async ({ request, locals: {supabase} }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordConfirm = formData.get('passwordConfirm') as string;

        const returnObject: ReturnObject = {
            success: true,
            email,
            name,
            password,
            passwordConfirm,
            errors: [],
        }

        if (name.length < 3) {
            returnObject.errors.push('Name has to be at least of length 3 characters');
        }

        if (!email.length) {
            returnObject.errors.push('Email is required');
        }

        if (!password.length) {
            returnObject.errors.push('Password is required');
        }

        if (password !== passwordConfirm) {
            returnObject.errors.push('Passwords do not match');
        }

        if (returnObject.errors.length) {
            returnObject.success = false;
            return returnObject;
        }

        // Registration logic here
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error || !data.user) {
            returnObject.success = false;
            returnObject.errors.push(error.message);
            return fail(400, returnObject as any)
        }

        await supabase.from('user_names').insert([{ name, user_id: data.user.id }]);

        redirect(303, '/private/dashboard');
    }
}

