// Goes in: app/api/items/route.ts
// The owner: "Stop selling anything that's not available."
// Fixed here. The list hides the Gingerbread Latte now.
// Open /api/items/8 before you celebrate.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { items } from "../../../drizzle/schema";

export async function GET() {
  const db = drizzle(neon(process.env.NEON_DATABASE_URL!));
  const rows = await db
    .select()
    .from(items)
    .where(eq(items.isAvailable, true))
    .orderBy(items.id);
  return Response.json(rows);
}

export async function POST(request: Request) {
  // TODO: check the body, then save a new item.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
