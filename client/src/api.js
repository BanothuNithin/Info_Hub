// src/api.js
export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

/**
 * Build a full URL for backend endpoints.
 * - If BASE_URL is "/api" (local proxy), this returns `/api${path}`
 * - If BASE_URL is an absolute URL and already ends with `/api`, it appends the path
 * - If BASE_URL is an absolute URL without `/api`, it prefixes `/api` so deployed backends receive `/api/...`
 */
export function buildUrl(path) {
	if (!path.startsWith("/")) path = "/" + path;

	// local proxy mode
	if (BASE_URL === "/api") return `/api${path}`;

	// absolute URL mode
	try {
		const url = new URL(BASE_URL);
		// if BASE_URL ends with /api, don't add another
		if (BASE_URL.endsWith("/api")) return `${BASE_URL}${path}`;
		return `${BASE_URL}/api${path}`;
	} catch (e) {
		// BASE_URL is a relative string other than '/api' — fall back
		return `${BASE_URL}${path}`;
	}
}
