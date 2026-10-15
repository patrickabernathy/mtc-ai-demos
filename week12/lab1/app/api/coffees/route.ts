// /api/coffees -- every coffee, and adding a new one.
// No connection, no query, no import from drizzle. Check the request, ask
// the service, pick the status code.
import { ItemService } from "../../../services/itemService";

export async function GET(request: Request) {
  // ?search=lat&maxPrice=4 -- both are text, and both can be missing.
  const query = new URL(request.url).searchParams;
  const search = query.get("search") ?? "";

  let maxPrice: number | undefined;
  const maxPriceText = query.get("maxPrice");
  if (maxPriceText !== null) {
    maxPrice = Number(maxPriceText);
    if (Number.isNaN(maxPrice) || maxPrice <= 0) {
      return Response.json({ error: "maxPrice must be a number above 0" }, { status: 400 });
    }
  }

  const coffees = await ItemService.getInstance().getCoffees(search, maxPrice);
  return Response.json(coffees);
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

  const coffee = await ItemService.getInstance().createCoffee({
    name: body.name,
    description: body.description || null, // no description is NULL, like store.sql
    price: body.price,
    isAvailable: true, // a new coffee starts on sale
  });
  return Response.json(coffee, { status: 201 });
}
