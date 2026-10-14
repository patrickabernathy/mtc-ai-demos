// /api/items/3 -- one item: read it, or change its price.
// Right now nothing here talks to the database. That's tonight.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // TODO: ask the database for this one item.
  return Response.json({ error: `No item with id ${id}` }, { status: 404 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // TODO: check the body, then change the price.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
