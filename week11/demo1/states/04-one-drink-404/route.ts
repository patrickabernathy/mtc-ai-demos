// Goes in: app/api/menu/[id]/route.ts
// Missing drink -> a 404 you chose, with a sentence saying what was missing.
import { menu } from "../../../../types/coffee";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const drink = menu.find((d) => d.id === Number(id));
  if (!drink) {
    return Response.json({ error: `No drink with id ${id}` }, { status: 404 });
  }
  return Response.json(drink);
}
