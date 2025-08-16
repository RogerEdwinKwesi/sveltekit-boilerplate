import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Redirect to login page
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		// Clear the auth cookie
		cookies.delete('auth_token', { path: '/' });
		
		// Redirect to login page
		throw redirect(302, '/');
	}
};