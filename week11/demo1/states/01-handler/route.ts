// Goes in: app/api/menu/route.ts
// The file is in the right place and the code is correct -- and it answers 405.
// Next routes on the NAME of the exported function, and "handler" is not a verb.
import { menu } from "../../../types/coffee";

export async function handler() {
  return Response.json(menu);
}
