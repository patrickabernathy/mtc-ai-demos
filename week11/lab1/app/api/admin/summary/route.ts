import { pets } from "../../../../types/pet";

// Admin only: the proxy wants a username and password (Basic auth)
// for anything under /api/admin.
// The numbers are worked out from the live list, so they change after every POST and PUT.
export async function GET() {
  const adopted = pets.filter((p) => p.adopted).length;
  return Response.json({
    total: pets.length,
    adopted: adopted,
    waiting: pets.length - adopted,
  });
}
