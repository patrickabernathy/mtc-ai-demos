// Goes in: app/api/menu/[id]/route.ts
// One drink: read it, change part of it, remove it.
import { menu } from "../../../../types/coffee";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const drink = menu.find((d) => d.id === Number(id));
  if (!drink) {
    return Response.json({ error: `No drink with id ${id}` }, { status: 404 });
  }
  return Response.json(drink);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const drink = menu.find((d) => d.id === Number(id));
  if (!drink) {
    return Response.json({ error: `No drink with id ${id}` }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }

  if (body.price !== undefined) {
    if (typeof body.price !== "number" || body.price <= 0) {
      return Response.json({ error: "price must be a number above 0" }, { status: 400 });
    }
    drink.price = body.price;
  }
  return Response.json(drink);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = menu.findIndex((d) => d.id === Number(id));
  if (index === -1) {
    return Response.json({ error: `No drink with id ${id}` }, { status: 404 });
  }
  menu.splice(index, 1);
  return new Response(null, { status: 204 });
}
