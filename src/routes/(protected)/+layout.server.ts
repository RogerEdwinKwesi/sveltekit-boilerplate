import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals }) => {
  return {
    pathname: url.pathname,
    user: locals.user || null
  };
};