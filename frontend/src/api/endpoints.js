import { apiFetch } from "./client";

export function getCurrentUser() {
    return apiFetch("/api/me");
}

export function logout() {
    return apiFetch("/logout", { method: "POST" });
}

export function generateTitles(payload) {
    return apiFetch("/api/generate", { method: "POST", body: payload });
}

export function generateThumbnail(payload) {
    return apiFetch("/api/generate-thumbnail", { method: "POST", body: payload });
}
