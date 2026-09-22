export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://qabas-nqg8.vercel.app";

/**
 * Resolve a backend path to an absolute URL.
 * - Relative paths ("/uploads/x.png") are prefixed with API_BASE_URL.
 * - Absolute http(s) URLs pass through, except legacy
 *   "http://localhost:5000/..." values stored in the DB,
 *   which are rewritten to the current API origin.
 */
export function apiUrl(path: string): string {
  if (path.startsWith("http://localhost:5000")) {
    return API_BASE_URL + path.slice("http://localhost:5000".length);
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return API_BASE_URL + (path.startsWith("/") ? path : `/${path}`);
}
