// GET /api/my-pets -- every pet the logged-in person has adopted.
// "My" pets only means something once the server knows who "me" is.
// That's tonight's job: each TODO is a step in instructions.pdf.

export async function GET() {
  // TODO (Step 12): Who is asking? Nobody logged in? Answer 401.
  // TODO (Step 12): Ask PetService for the pets owned by that person's email.
  return Response.json({ error: "Not built yet. That's Step 12." }, { status: 501 });
}
