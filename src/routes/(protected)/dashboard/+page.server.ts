import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils/auth';

export const load: PageServerLoad = async ({ locals, ...event }) => {
	if (!locals.user) {
		const redirectUrl = handleLoginRedirect(event);
		throw redirect(302, redirectUrl);
	}
	
	// You can fetch data here that's specific to the dashboard
	// For example, analytics data, recent activities, etc.
	
	return {
		user: locals.user
	};
};