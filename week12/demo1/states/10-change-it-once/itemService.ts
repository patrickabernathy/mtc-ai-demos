// Goes in: services/itemService.ts
// The owner again: "Items with no description look unfinished. Hide them
// until somebody writes one." One line changed. Both routes obey it.
// (Fourteen items have a NULL description, so the menu gets a lot shorter.)
import { and, eq, isNotNull } from "drizzle-orm";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { items } from "../drizzle/schema";

const onSale = and(eq(items.isAvailable, true), isNotNull(items.description));

export class ItemService {
  private static instance: ItemService;

  public static getInstance(): ItemService {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService();
    }
    return ItemService.instance;
  }

  private getDb() {
    return NeonDatabaseProvider.getInstance().getDb();
  }

  public async getAll() {
    return this.getDb().select().from(items).where(onSale).orderBy(items.id);
  }

  public async getById(id: number) {
    const [item] = await this.getDb()
      .select()
      .from(items)
      .where(and(eq(items.id, id), onSale));
    return item;
  }
}
