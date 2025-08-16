import type { UserData } from '$lib/types';

// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: UserData;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};