// GET /api/items/search?q=latte -- items whose name has these words in it.
import { ItemService } from "../../../../services/itemService";

export async function GET(request: Request) {
  const words = new URL(request.url).searchParams.get("q") ?? "";

  try {
    const results = await ItemService.getInstance().search(words);
    return Response.json(results);
  } catch (error) {
    // A teammate's change: send back exactly what went wrong, to be helpful.
    const e = error as Error;
    return Response.json({ error: e.message, stack: e.stack }, { status: 500 });
  }
}
