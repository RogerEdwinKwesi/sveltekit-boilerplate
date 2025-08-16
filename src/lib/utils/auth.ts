import type { RequestEvent } from '@sveltejs/kit';

export function handleLoginRedirect(
    event: RequestEvent,
    message: string = "You must be logged in to access this page"
) {
    const redirectTo = event.url.pathname + event.url.search;
    return `/login?redirectTo=${redirectTo}&message=${message}`;
}

export function getRedirectUrl(url: URL): string | null {
    return url.searchParams.get('redirectTo');
}

export function getAuthMessage(url: URL): string | null {
    return url.searchParams.get('message');
}

export function isValidRedirectUrl(url: string): boolean {
    try {
        const parsed = new URL(url, 'http://localhost');
        // Only allow relative URLs or same-origin URLs
        return parsed.pathname.startsWith('/') && !parsed.pathname.startsWith('//');
    } catch {
        return false;
    }
}