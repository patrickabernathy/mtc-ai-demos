// Goes in: app/api/menu/route.ts
// POST believes everything. {} saves a drink with no name; "banana" saves as a price.
import { menu } from "../../../types/coffee";

export async function GET() {
  return Response.json(menu);
}

export async function POST(request: Request) {
  const body = await request.json();
  const drink = { id: menu.length + 1, name: body.name, price: body.price };
  menu.push(drink);
  return Response.json(drink, { status: 201 });
}
