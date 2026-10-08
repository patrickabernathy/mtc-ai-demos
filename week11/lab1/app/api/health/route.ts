// Already done for you: the smallest route there is.
// The folder is the address (/api/health), the function name is the verb (GET).
// It stays open to everyone, even after the proxy locks everything else.
export async function GET() {
  return Response.json({ status: "ok" });
}
