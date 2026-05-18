export const INTERNAL_ROLES = new Set([
  "superadmin",
  "mudir_aam",
  "pengasuh",
  "ustadz",
  "ustadzah",
  "bendahara",
  "admin_keuangan",
  "kepala_sekolah",
  "staff_umum",
  "admin_kesantrian"
]);

const SESSION_KEY = "asf_session";

function parseSession(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.token || !parsed.user?.role) return null;
    return parsed;
  } catch (_error) {
    return null;
  }
}

function readFrom(storage) {
  try {
    return parseSession(storage.getItem(SESSION_KEY));
  } catch (_error) {
    return null;
  }
}

export function readSessionWithSource() {
  if (typeof window === "undefined") return { session: null, source: null };

  const fromSession = readFrom(sessionStorage);
  if (fromSession) return { session: fromSession, source: "sessionStorage" };

  const fromLocal = readFrom(localStorage);
  if (fromLocal) return { session: fromLocal, source: "localStorage" };

  return { session: null, source: null };
}

export function readSession() {
  return readSessionWithSource().session;
}

export function readRole() {
  const session = readSession();
  return String(session?.user?.role || "umum").toLowerCase();
}

export function saveSession(session, options = {}) {
  if (typeof window === "undefined") return;
  const usePersistent = options.persist === true;
  const target = usePersistent ? localStorage : sessionStorage;
  const backup = usePersistent ? sessionStorage : localStorage;

  try {
    backup.removeItem(SESSION_KEY);
  } catch (_error) {
    // noop
  }
  try {
    target.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (_error) {
    // noop
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_error) {
    // noop
  }
}

export function isInternalRole(role) {
  return INTERNAL_ROLES.has(String(role || "").toLowerCase());
}
