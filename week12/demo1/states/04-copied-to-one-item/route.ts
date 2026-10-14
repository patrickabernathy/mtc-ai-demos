// Goes in: app/api/items/[id]/route.ts
// Copied from the list route and changed a little. Now two files open
// their own connection and know how to ask about items.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { items } from "../../../../drizzle/schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = drizzle(neon(process.env.NEON_DATABASE_URL!));
  const [item] = await db.select().from(items).where(eq(items.id, Number(id)));
  if (!item) {
    return Response.json({ error: `No item with id ${id}` }, { status: 404 });
  }
  return Response.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // TODO: check the body, then change the price.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
