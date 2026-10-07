import { menu } from "../../../types/coffee";

export async function GET() {
  return Response.json(menu);
}
