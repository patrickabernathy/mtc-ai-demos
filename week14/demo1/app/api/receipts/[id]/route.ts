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
  if (!receipt) {
    return Response.json({ error: `No receipt with id ${id}` }, { status: 404 });
  }
  return Response.json(receipt);
}
