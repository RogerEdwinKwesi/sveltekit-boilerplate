import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils/auth';

export const load: LayoutServerLoad = async ({ url, locals, ...event }) => {
  if (!locals.user) {
    const redirectUrl = handleLoginRedirect(event);
    throw redirect(302, redirectUrl);
  }
  
  return {
    pathname: url.pathname,
    user: locals.user
  };
};