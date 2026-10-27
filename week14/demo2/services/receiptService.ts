// The ONE file that knows how to ask the database about receipts.
import { desc, eq } from "drizzle-orm";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { items, receiptItems, receipts, users } from "../drizzle/schema";

export class ReceiptService {
  private static instance: ReceiptService;

  public static getInstance(): ReceiptService {
    if (!ReceiptService.instance) {
      ReceiptService.instance = new ReceiptService();
    }
    return ReceiptService.instance;
  }

  private getDb() {
    return NeonDatabaseProvider.getInstance().getDb();
  }

  // One customer's ten most recent receipts.
  public async getForCustomer(customerId: number) {
    return this.getDb()
      .select({ id: receipts.id, createdAt: receipts.createdAt, tip: receipts.tip })
      .from(receipts)
      .where(eq(receipts.customerId, customerId))
      .orderBy(desc(receipts.createdAt))
      .limit(10);
  }

  // One receipt, whoever it belongs to, with what was on it.
  // Gives back undefined when there's no such receipt.
  public async getById(id: number) {
    const [receipt] = await this.getDb()
      .select({
        id: receipts.id,
        customerId: receipts.customerId,
        customer: users.firstName,
        createdAt: receipts.createdAt,
        paymentMethod: receipts.paymentMethod,
        tip: receipts.tip,
      })
      .from(receipts)
      .leftJoin(users, eq(receipts.customerId, users.id))
      .where(eq(receipts.id, id));
    if (!receipt) {
      return undefined;
    }

    const lines = await this.getDb()
      .select({ item: items.name, quantity: receiptItems.quantity, price: receiptItems.unitPrice })
      .from(receiptItems)
      .innerJoin(items, eq(receiptItems.itemId, items.id))
      .where(eq(receiptItems.receiptId, id));

    return { ...receipt, lines };
  }
}
