import { writable, derived } from 'svelte/store';
import type { UserData } from '../types.js';

export const authStore = writable<UserData | null>(null);

export const isAuthenticated = derived(
	authStore,
	($authStore) => $authStore !== null
);

export const userRole = derived(
	authStore,
	($authStore) => $authStore?.role || null
);

export const userFullName = derived(
	authStore,
	($authStore) => $authStore?.fullName || 'User'
);

// Helper functions for the auth store
export const auth = {
	setUser: (user: UserData | null) => authStore.set(user),
	logout: () => authStore.set(null),
	updateUser: (updates: Partial<UserData>) => {
		authStore.update(current => {
			if (!current) return null;
			return { ...current, ...updates };
		});
	}
};