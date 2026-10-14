// /api/items -- the whole menu, and adding to it.
// Right now nothing here talks to the database. That's tonight.

export async function GET() {
  // TODO: ask the database for the menu.
  return Response.json([]);
}

export async function POST(request: Request) {
  // TODO: check the body, then save a new item.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
