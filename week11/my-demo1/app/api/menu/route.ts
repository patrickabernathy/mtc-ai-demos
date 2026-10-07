// app/api/menu/route.ts
import { menu } from "../../../types/coffee";

export async function GET() {
  return Response.json(menu);
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ received: body }, { status: 201 });
}
