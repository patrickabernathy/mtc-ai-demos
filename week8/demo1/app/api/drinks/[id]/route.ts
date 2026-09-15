import { menu } from "../../../../types/coffee";

// A pretend server, slow on purpose, so the waiting is visible on a projector.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await new Promise((resolve) => setTimeout(resolve, 600));

  const drink = menu.find((d) => d.id === Number(id));
  if (!drink) {
    return Response.json({ error: "No such drink" }, { status: 404 });
  }

  return Response.json(drink);
}
