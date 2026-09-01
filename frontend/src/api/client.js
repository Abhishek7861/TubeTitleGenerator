import { API_URL } from "../config";

/**
 * Thin fetch wrapper. Sends credentials for the session cookie,
 * serializes JSON bodies, and parses JSON responses. Throws on non-2xx.
 */
export async function apiFetch(path, { method = "GET", body, headers } = {}) {

    const response = await fetch(`${API_URL}${path}`, {
        method,
        credentials: "include",
        headers: {
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new ApiError(response.status, text || response.statusText);
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return response.json();
    }
    return response.text();
}

export class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
