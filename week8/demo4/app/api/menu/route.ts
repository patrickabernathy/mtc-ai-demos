import { menu } from "../../../types/coffee";

// Deliberately slow so the two requests are visible in the Network tab.
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return Response.json(menu);
}
