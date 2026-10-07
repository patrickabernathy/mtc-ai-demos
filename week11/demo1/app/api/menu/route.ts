import { menu } from "../../../types/coffee";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const maxPrice = url.searchParams.get("maxPrice");
  if (maxPrice) {
    return Response.json(menu.filter((d) => d.price <= Number(maxPrice)));
  }
  return Response.json(menu);
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

  // The biggest id in use, plus one. menu.length + 1 hands out a duplicate after a delete.
  const id = Math.max(0, ...menu.map((d) => d.id)) + 1;
  const drink = { id, name: body.name, price: body.price };
  menu.push(drink);
  return Response.json(drink, { status: 201 });
}
