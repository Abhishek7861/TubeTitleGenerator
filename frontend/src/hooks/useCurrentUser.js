import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/endpoints";

/**
 * Fetches the signed-in user on mount.
 * Redirects to /login if the request fails (401 or network error).
 * Returns null while loading.
 */
export function useCurrentUser() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(() => {
                window.location.href = "/login";
            });
    }, []);

    return user;
}
