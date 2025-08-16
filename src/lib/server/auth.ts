import type { UserData } from '../types.js';

export async function verifyToken(token: string): Promise<UserData | null> {
	try {
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

export function extractTokenFromCookies(cookies: string): string | null {
	if (!cookies) return null;
	
	const tokenCookie = cookies
		.split(';')
		.find(cookie => cookie.trim().startsWith('auth_token='));
	
	if (!tokenCookie) return null;
	
	return tokenCookie.split('=')[1]?.trim() || null;
}

export async function generateToken(user: UserData): Promise<string> {
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