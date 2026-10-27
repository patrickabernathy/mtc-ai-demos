// /api/categories/2/items -- every item in one category.
// A new address, one new method in the service, and this route is five lines.
import { ItemService } from "../../../../../services/itemService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const items = await ItemService.getInstance().getByCategory(Number(id));
  return Response.json(items);
}
