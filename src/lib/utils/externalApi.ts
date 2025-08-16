import type { UserData } from '$lib/types.js';

export class ExternalApiClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl.replace(/\/$/, '');
	}

	async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			},
			...options
		});

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	}

	async makeAuthenticatedRequest<T>(endpoint: string, token: string, options: RequestInit = {}): Promise<T> {
		return this.makeRequest<T>(endpoint, {
			...options,
			headers: {
				'Authorization': `Bearer ${token}`,
				...options.headers
			}
		});
	}

	async fetchUserData(token: string): Promise<UserData> {
		return this.makeAuthenticatedRequest<UserData>('/user', token);
	}

	async fetchDashboardData(token: string): Promise<any> {
		return this.makeAuthenticatedRequest('/dashboard', token);
	}

	async login(credentials: { email: string; password: string }): Promise<{ token: string; user: UserData }> {
		return this.makeRequest('/auth/login', {
			method: 'POST',
			body: JSON.stringify(credentials)
		});
	}

	async register(userData: { email: string; password: string; name: string }): Promise<{ token: string; user: UserData }> {
		return this.makeRequest('/auth/register', {
			method: 'POST',
			body: JSON.stringify(userData)
		});
	}
}

export function createApiClient(): ExternalApiClient | null {
	try {
		const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
		if (!EXTERNAL_API_URL) {
			console.error('EXTERNAL_API_URL not configured');
			return null;
		}
		return new ExternalApiClient(EXTERNAL_API_URL);
	} catch (error) {
		console.error('Failed to create API client:', error);
		return null;
	}
}