// /api/coffees -- every coffee, and adding a new one.
// Checking the request is already done, the week 11 way. What's missing is
// the database: each TODO is a step in instructions.pdf.

export async function GET(request: Request) {
  // TODO (Step 6): ask the service for the coffees.
  // TODO (Steps 11 and 12): read ?search= and ?maxPrice= from the address.
  return Response.json([]);
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }

  if (body === null || typeof body !== "object") {
    return Response.json(
      { error: "The body must be a JSON object with name, description and price" },
      { status: 400 }
    );
  }
  if (typeof body.name !== "string" || body.name === "") {
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  // description is optional: leave it out, or send "", and the coffee has none.
  if (body.description !== undefined && typeof body.description !== "string") {
    return Response.json({ error: "description must be text" }, { status: 400 });
  }
  if (typeof body.price !== "number" || body.price <= 0) {
    return Response.json({ error: "price must be a number above 0" }, { status: 400 });
  }

  // TODO (Step 8): save it through the service, then answer 201 with the new coffee.
  return Response.json({ error: "Not built yet. That's Step 8." }, { status: 501 });
}
