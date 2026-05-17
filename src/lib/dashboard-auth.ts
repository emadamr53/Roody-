/** Dashboard login — works on Vercel and locally */
const DASHBOARD_PASSWORD = (
  process.env.DASHBOARD_PASSWORD ?? "roody123"
).trim();

export function checkDashboardPassword(request: Request): boolean {
  const header = request.headers.get("x-dashboard-password")?.trim();
  if (header === DASHBOARD_PASSWORD) return true;

  const url = new URL(request.url);
  const query = url.searchParams.get("password")?.trim();
  return query === DASHBOARD_PASSWORD;
}
