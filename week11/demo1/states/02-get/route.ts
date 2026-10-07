// Goes in: app/api/menu/route.ts
// Same code, one word renamed. The function's name is the verb it answers.
import { menu } from "../../../types/coffee";

export async function GET() {
  return Response.json(menu);
}
