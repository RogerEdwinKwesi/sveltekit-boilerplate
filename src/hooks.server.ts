import type { Handle } from '@sveltejs/kit';
import { extractTokenFromCookies, verifyToken } from '$lib/server/auth';
import { handleLoginRedirect } from '$lib/utils/auth';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		// Extract token from cookies
		const cookieHeader = event.request.headers.get('cookie');
		const token = extractTokenFromCookies(cookieHeader || '');

		if (token) {
			const user = await verifyToken(token);
			if (user) {
				event.locals.user = user;
			}
		}

		// Define protected routes - customize these for your application
		const protectedPageRoutes = ['/dashboard', '/profile'];
		const loginPages = ['/', '/login', '/register', '/otp'];

		const isProtectedPage = protectedPageRoutes.some(route => 
			event.url.pathname.startsWith(route)
		);
		const isLoginPage = loginPages.includes(event.url.pathname);

		// Redirect authenticated users away from login pages
		if (isLoginPage && event.locals.user) {
			return new Response(null, {
				status: 302,
				headers: {
					location: '/dashboard'
				}
			});
		}

		// Protect authenticated routes
		if (isProtectedPage) {
			if (!event.locals.user) {
				const redirectUrl = handleLoginRedirect(event);
				return new Response(null, {
					status: 302,
					headers: {
						location: redirectUrl
					}
				});
			}
		}

		return resolve(event);
	} catch (error) {
		console.error('Hook error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
};