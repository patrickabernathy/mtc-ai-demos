// GET /api/receipts/123 -- one receipt, with what was on it.
import { AuthService } from "../../../../services/authService";
import { ReceiptService } from "../../../../services/receiptService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await AuthService.getInstance().getCurrentUser();
  if (!user) {
    return Response.json({ error: "Log in first" }, { status: 401 });
  }

  const { id } = await params;
  const receipt = await ReceiptService.getInstance().getById(Number(id));

  // Logged in isn't enough. It has to be YOUR receipt.
  // Someone else's gets the same 404 as one that doesn't exist,
  // so we don't even admit it's there.
  if (!receipt || receipt.customerId !== user.id) {
    return Response.json({ error: `No receipt with id ${id}` }, { status: 404 });
  }
  return Response.json(receipt);
}
