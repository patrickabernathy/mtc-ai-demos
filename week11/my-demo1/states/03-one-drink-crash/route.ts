// Goes in: app/api/menu/[id]/route.ts
// /api/menu/2 works. /api/menu/99 is a 500: find() gives undefined, and
// Response.json(undefined) throws. Nothing here decides to say 404.
import { menu } from "../../../../types/coffee";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const drink = menu.find((d) => d.id === Number(id));
  return Response.json(drink);
}
