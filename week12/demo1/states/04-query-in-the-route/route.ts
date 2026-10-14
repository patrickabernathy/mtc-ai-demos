// Goes in: app/api/items/route.ts
// It works. The provider hands over the connection, and the route writes
// its own query. Keep an eye on how many routes end up doing this.
import { NeonDatabaseProvider } from "../../../providers/neon/neonDatabaseProvider";
import { items } from "../../../drizzle/schema";

export async function GET() {
  const db = NeonDatabaseProvider.getInstance().getDb();
  const rows = await db.select().from(items).orderBy(items.id);
  return Response.json(rows);
}

export async function POST(request: Request) {
  // TODO: check the body, then save a new item.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
