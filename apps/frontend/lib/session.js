export const INTERNAL_ROLES = new Set(["mudir_aam", "ustadz", "ustadzah"]);

export function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("asf_session");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.token || !parsed.user?.role) return null;
    return parsed;
  } catch (_error) {
    return null;
  }
}

export function saveSession(session) {
  if (typeof window === "undefined") return;
  localStorage.setItem("asf_session", JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("asf_session");
}

export function isInternalRole(role) {
  return INTERNAL_ROLES.has(String(role || "").toLowerCase());
}
