import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// You can fetch data here that's specific to the dashboard
	// For example, analytics data, recent activities, etc.
	
	return {
		user: locals.user
	};
};