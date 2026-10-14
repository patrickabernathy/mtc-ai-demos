// Goes in: app/api/items/route.ts
// It works. The route opens its own connection and writes its own query.
// Keep an eye on how many files end up doing this.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { items } from "../../../drizzle/schema";

export async function GET() {
  // The ! means "trust me, this is set". Nothing actually checks.
  const db = drizzle(neon(process.env.NEON_DATABASE_URL!));
  const rows = await db.select().from(items).orderBy(items.id);
  return Response.json(rows);
}

export async function POST(request: Request) {
  // TODO: check the body, then save a new item.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
