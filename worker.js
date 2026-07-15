// Passes all traffic through to the origin. If the origin is down,
// serves the maintenance page instead of a generic gateway error.

const MAINTENANCE_URL = "https://codecockpit.github.io/maintenance/";
const ERROR_STATUSES = new Set([500, 502, 503, 521, 522, 523, 524]);

export default {
  async fetch(request) {
    const response = await fetch(request);

    if (!ERROR_STATUSES.has(response.status)) {
      return response;
    }

    const maintenance = await fetch(MAINTENANCE_URL);
    if (!maintenance.ok) {
      // Maintenance page unreachable too; fall back to the original error.
      return response;
    }

    // 503 + Retry-After tells crawlers this is temporary, so the real
    // pages never drop out of search indexes.
    return new Response(maintenance.body, {
      status: 503,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "retry-after": "60",
        "cache-control": "no-store",
      },
    });
  },
};
