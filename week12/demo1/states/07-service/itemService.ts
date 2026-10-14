// Goes in: services/itemService.ts
// The ONE file that knows how to ask the database about items.
// Routes call these methods. Routes never write a query themselves.
import { and, eq } from "drizzle-orm";
import { NeonProvider } from "../providers/neon";
import { items } from "../drizzle/schema";

// The store's rule about what a customer can see, written once.
// Every method below uses it, so changing it here changes it everywhere.
const onSale = eq(items.isAvailable, true);

export class ItemService {
  private static instance: ItemService;

  public static getInstance(): ItemService {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService();
    }
    return ItemService.instance;
  }

  private getDb() {
    return NeonProvider.getInstance().getDb();
  }

  public async getAll() {
    return this.getDb().select().from(items).where(onSale).orderBy(items.id);
  }

  // Gives back undefined when there's no such item (or it's not on sale).
  public async getById(id: number) {
    const [item] = await this.getDb()
      .select()
      .from(items)
      .where(and(eq(items.id, id), onSale));
    return item;
  }
}
