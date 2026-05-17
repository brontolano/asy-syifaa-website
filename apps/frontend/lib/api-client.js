const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const DEFAULT_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || 8000);

function normalizeParams(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const text = String(value).trim();
    if (!text) return;
    search.set(key, text);
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

export function withQuery(path, params = {}) {
  return `${path}${normalizeParams(params)}`;
}

export async function fetchApi(path, options = {}) {
  const controller = new AbortController();
  const timeoutMs = Number(options.timeoutMs || DEFAULT_TIMEOUT_MS);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      ...options,
      signal: controller.signal
    });

    let data = null;
    try {
      data = await response.json();
    } catch (_error) {
      data = null;
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
      error: null
    };
  } catch (error) {
    const message = error?.name === "AbortError" ? "request_timeout" : "network_error";
    return {
      ok: false,
      status: 0,
      data: null,
      error: message
    };
  } finally {
    clearTimeout(timeout);
  }
}
