// /api/items -- the whole menu, and adding to it.
// No connection, no query, no import from drizzle. Check the request, ask
// the service, pick the status code.
import { ItemService } from "../../../services/itemService";

export async function GET() {
  const items = await ItemService.getInstance().getAll();
  return Response.json(items);
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }

  if (typeof body.name !== "string" || body.name === "") {
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  if (typeof body.price !== "number" || body.price <= 0) {
    return Response.json({ error: "price must be a number above 0" }, { status: 400 });
  }
  if (typeof body.categoryId !== "number") {
    return Response.json({ error: "categoryId must be a number" }, { status: 400 });
  }

  const item = await ItemService.getInstance().create({
    categoryId: body.categoryId,
    name: body.name,
    price: body.price,
    description: body.description,
  });
  return Response.json(item, { status: 201 });
}
