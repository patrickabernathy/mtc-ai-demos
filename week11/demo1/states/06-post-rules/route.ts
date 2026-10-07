// Goes in: app/api/menu/route.ts
// Read the body carefully, check it, and only then save. Every error is {"error": "..."}.
import { menu } from "../../../types/coffee";

export async function GET() {
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

  const drink = { id: menu.length + 1, name: body.name, price: body.price };
  menu.push(drink);
  return Response.json(drink, { status: 201 });
}
