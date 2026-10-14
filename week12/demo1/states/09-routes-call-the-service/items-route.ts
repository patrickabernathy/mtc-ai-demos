// Goes in: app/api/items/route.ts  (rename to route.ts)
// No query, no schema, no import from drizzle. Ask the service, answer.
import { ItemService } from "../../../services/itemService";

export async function GET() {
  const items = await ItemService.getInstance().getAll();
  return Response.json(items);
}

export async function POST(request: Request) {
  // TODO: check the body, then save a new item.
  return Response.json({ error: "Not built yet" }, { status: 501 });
}
