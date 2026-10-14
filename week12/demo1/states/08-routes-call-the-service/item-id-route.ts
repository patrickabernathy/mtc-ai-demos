// Goes in: app/api/items/[id]/route.ts  (rename to route.ts)
// Same shape as the list route: ask the service, then decide the status code.
import { ItemService } from "../../../../services/itemService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await ItemService.getInstance().getById(Number(id));
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
