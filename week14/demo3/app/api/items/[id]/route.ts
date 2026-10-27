// /api/items/3 -- one item: read it, change its price, take it off the menu.
// Same shape as the list route: ask the service, then decide the status code.
import { AuthService } from "../../../../services/authService";
import { ItemService } from "../../../../services/itemService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await ItemService.getInstance().getById(Number(id));
  if (!item) {
    return Response.json({ error: `No item with id ${id}` }, { status: 404 });
  }
  return Response.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Who are you? Then: are you allowed?
  const user = await AuthService.getInstance().getCurrentUser();
  if (!user) {
    return Response.json({ error: "Log in first" }, { status: 401 });
  }
  if (!(await AuthService.getInstance().hasRole(user.id, "manager"))) {
    return Response.json({ error: "Only a manager can change prices" }, { status: 403 });
  }

  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }
  if (typeof body.price !== "number" || body.price <= 0) {
    return Response.json({ error: "price must be a number above 0" }, { status: 400 });
  }

  const item = await ItemService.getInstance().updatePrice(Number(id), body.price);
  if (!item) {
    return Response.json({ error: `No item with id ${id}` }, { status: 404 });
  }
  return Response.json(item);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await ItemService.getInstance().retire(Number(id));
  if (!item) {
    return Response.json({ error: `No item with id ${id}` }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
