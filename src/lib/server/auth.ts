import type { UserData } from '../types.js';

export async function verifyToken(token: string): Promise<UserData | null> {
	try {
		const { USE_EXTERNAL_AUTH } = await import('$env/static/private');
		
		if (USE_EXTERNAL_AUTH === 'true') {
			return await verifyExternalToken(token);
		}
		
		const jwt = await import('jsonwebtoken');
		const { JWT_SECRET } = await import('$env/static/private');
		
		if (!JWT_SECRET) {
			console.error('JWT_SECRET is not configured');
			return null;
		}

		const decoded = jwt.default.verify(token, JWT_SECRET) as UserData;
		return decoded;
	} catch (error) {
		console.error('JWT verification failed:', error);
		return null;
	}
}

export async function verifyExternalToken(token: string): Promise<UserData | null> {
	try {
		const { EXTERNAL_API_URL } = await import('$env/static/private');
		
		if (!EXTERNAL_API_URL) {
			console.error('EXTERNAL_API_URL is not configured');
			return null;
		}

		const response = await fetch(`${EXTERNAL_API_URL}/auth/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return null;
		}

		const userData = await response.json() as UserData;
		return userData;
	} catch (error) {
		console.error('External token verification failed:', error);
		return null;
	}
}

export function extractTokenFromCookies(cookies: string): string | null {
	if (!cookies) return null;
	
	const tokenCookie = cookies
		.split(';')
		.find(cookie => cookie.trim().startsWith('auth_token='));
	
	if (!tokenCookie) return null;
	
	return tokenCookie.split('=')[1]?.trim() || null;
}

export async function generateToken(user: UserData): Promise<string> {
	const { USE_EXTERNAL_AUTH } = await import('$env/static/private');
	
	if (USE_EXTERNAL_AUTH === 'true') {
		throw new Error('Token generation not supported with external auth - tokens should come from external API');
	}
	
	const jwt = await import('jsonwebtoken');
	const { JWT_SECRET } = await import('$env/static/private');
	
	if (!JWT_SECRET) {
		throw new Error('JWT_SECRET is not configured');
	}

	return jwt.default.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function createAuthCookie(token: string): string {
	return `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
}

export function clearAuthCookie(): string {
	return 'auth_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';
}