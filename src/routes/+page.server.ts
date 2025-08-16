import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { generateToken, createAuthCookie } from '$lib/server/auth';
import { getRedirectUrl, isValidRedirectUrl } from '$lib/utils/auth';
import { createApiClient } from '$lib/utils/externalApi';
import type { UserData } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if already authenticated
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		// TODO: Replace this with your actual authentication logic
		// This is a mock implementation
		if (email === 'admin@example.com' && password === 'password') {
			const user: UserData = {
				id: '1',
				email: email,
				firstName: 'Admin',
				lastName: 'User',
				fullName: 'Admin User',
				role: 'admin',
				status: 'active'
			};

			try {
				const token = await generateToken(user);
				cookies.set('auth_token', token, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					path: '/',
					maxAge: 60 * 60 * 24 * 7 // 7 days
				});

				// Handle redirect after login
				const redirectTo = getRedirectUrl(url);
				const redirectUrl = redirectTo && isValidRedirectUrl(redirectTo) ? redirectTo : '/dashboard';
				
				throw redirect(302, redirectUrl);
			} catch (error) {
				console.error('Login error:', error);
				return fail(500, { error: 'Authentication failed' });
			}
		}

		return fail(400, { error: 'Invalid credentials' });
	},

	loginWithAPI: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		try {
			const apiClient = createApiClient();
			if (!apiClient) {
				return fail(500, { error: 'External API not configured' });
			}

			const result = await apiClient.login({ email, password });
			const { token, user } = result;

			cookies.set('auth_token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});

			// Handle redirect after login
			const redirectTo = getRedirectUrl(url);
			const redirectUrl = redirectTo && isValidRedirectUrl(redirectTo) ? redirectTo : '/dashboard';
			
			throw redirect(302, redirectUrl);
		} catch (error) {
			console.error('External API login error:', error);
			if (error instanceof Error && error.message.includes('API request failed')) {
				return fail(400, { error: 'Invalid credentials' });
			}
			return fail(500, { error: 'Authentication failed' });
		}
	}
};