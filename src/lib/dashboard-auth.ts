export function checkDashboardPassword(request: Request): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return false;

  const header = request.headers.get("x-dashboard-password");
  if (header === expected) return true;

  const url = new URL(request.url);
  const query = url.searchParams.get("password");
  return query === expected;
}
