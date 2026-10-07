export async function GET() {
  const response = await fetch("https://n8n.aseglave.net/webhook/mtc-menu-auth", {
    headers: { "x-auth": process.env.MENU_KEY ?? "" },
  });
  const drinks = await response.json();
  return Response.json(drinks);
}
