// /api/coffees/3 -- one coffee: read it, change it, delete it.
// Same shape as the list route: ask the service, then decide the status code.
import { ItemService } from "../../../../services/itemService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const coffee = await ItemService.getInstance().getCoffee(Number(id));
  if (!coffee) {
    return Response.json({ error: `No coffee with id ${id}` }, { status: 404 });
  }
  return Response.json(coffee);
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

  const coffee = await ItemService.getInstance().updateCoffee(Number(id), {
    name: body.name,
    description: body.description || null, // no description is NULL, like store.sql
    price: body.price,
    isAvailable: body.isAvailable,
  });
  if (!coffee) {
    return Response.json({ error: `No coffee with id ${id}` }, { status: 404 });
  }
  return Response.json(coffee);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = ItemService.getInstance();

  const coffee = await service.getCoffee(Number(id));
  if (!coffee) {
    return Response.json({ error: `No coffee with id ${id}` }, { status: 404 });
  }
  // 409 Conflict: the request is fine, but the data says no.
  if (await service.hasBeenSold(coffee.id)) {
    return Response.json(
      { error: `${coffee.name} is on old receipts, so it can't be deleted. Mark it sold out instead.` },
      { status: 409 }
    );
  }

  await service.deleteCoffee(coffee.id);
  return new Response(null, { status: 204 });
}
