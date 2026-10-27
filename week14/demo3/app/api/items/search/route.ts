// GET /api/items/search?q=latte -- items whose name has these words in it.
import { ItemService } from "../../../../services/itemService";

export async function GET(request: Request) {
  const words = new URL(request.url).searchParams.get("q") ?? "";

  try {
    const results = await ItemService.getInstance().search(words);
    return Response.json(results);
  } catch (error) {
    // The real detail goes to the terminal. The browser gets one sentence.
    console.error("GET /api/items/search failed:", error);
    return Response.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
