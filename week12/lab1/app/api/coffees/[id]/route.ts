// /api/coffees/3 -- one coffee: read it, change it, delete it.
// Checking the request is already done, the week 11 way. What's missing is
// the database: each TODO is a step in instructions.pdf.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // TODO (Step 7): ask the service for coffee number id. None? Answer 404.
  return Response.json({ error: `Not built yet. That's Step 7. (You asked for ${id}.)` }, { status: 501 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }

  // PUT replaces the whole coffee, so every field has to be there.
  if (body === null || typeof body !== "object") {
    return Response.json(
      { error: "The body must be a JSON object with name, description, price and isAvailable" },
      { status: 400 }
    );
  }
  if (typeof body.name !== "string" || body.name === "") {
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  if (typeof body.description !== "string") {
    return Response.json({ error: "description must be text (send \"\" for none)" }, { status: 400 });
  }
  if (typeof body.price !== "number" || body.price <= 0) {
    return Response.json({ error: "price must be a number above 0" }, { status: 400 });
  }
  if (typeof body.isAvailable !== "boolean") {
    return Response.json({ error: "isAvailable must be true or false" }, { status: 400 });
  }

  // TODO (Step 9): change coffee number id through the service. None? Answer 404.
  return Response.json({ error: `Not built yet. That's Step 9. (You asked for ${id}.)` }, { status: 501 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // TODO (Step 10): delete coffee number id through the service, then answer 204.
  return Response.json({ error: `Not built yet. That's Step 10. (You asked for ${id}.)` }, { status: 501 });
}
