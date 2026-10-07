// Goes in: app/api/locked-menu/route.ts
// Needs .env.local in the project's top folder containing:  MENU_KEY=mtc-fall-2026
// The key is read here, on the server. The browser asks this route and never sees it.
export async function GET() {
  const response = await fetch("https://n8n.aseglave.net/webhook/mtc-menu-auth", {
    headers: { "x-auth": process.env.MENU_KEY ?? "" },
  });
  const drinks = await response.json();
  return Response.json(drinks);
}
