// GET /api/receipts -- MY ten most recent receipts.
import { AuthService } from "../../../services/authService";
import { ReceiptService } from "../../../services/receiptService";

export async function GET() {
  const user = await AuthService.getInstance().getCurrentUser();
  if (!user) {
    return Response.json({ error: "Log in first" }, { status: 401 });
  }

  // The list only ever asks for this user's receipts.
  const list = await ReceiptService.getInstance().getForCustomer(user.id);
  return Response.json(list);
}
