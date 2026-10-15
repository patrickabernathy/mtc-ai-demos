// The ONE file that knows how to ask the database about items.
// Routes call these methods. Routes never write a query themselves.
import { and, eq, ilike, lte } from "drizzle-orm";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { items, receiptItems } from "../drizzle/schema";

// Coffee is category 1 in store.sql. This app only ever works on coffees,
// so every query below uses this rule, written once.
const coffeeCategoryId = 1;
const isCoffee = eq(items.categoryId, coffeeCategoryId);

// What a route hands over to add or change a coffee. The route checks it first.
export type CoffeeInput = {
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
};

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

  // search "" matches every name. maxPrice is optional: and() skips anything
  // that's undefined, so with no maxPrice there's simply no price rule.
  public async getCoffees(search: string, maxPrice?: number) {
    return this.getDb()
      .select()
      .from(items)
      .where(
        and(
          isCoffee,
          ilike(items.name, `%${search}%`),
          maxPrice === undefined ? undefined : lte(items.price, maxPrice)
        )
      )
      .orderBy(items.id);
  }

  // Gives back undefined when there's no such coffee.
  public async getCoffee(id: number) {
    const [coffee] = await this.getDb()
      .select()
      .from(items)
      .where(and(eq(items.id, id), isCoffee));
    return coffee;
  }

  // .returning() hands back the row Postgres saved, new id included.
  // categoryId is added here, so a new coffee is always a coffee.
  public async createCoffee(input: CoffeeInput) {
    const [coffee] = await this.getDb()
      .insert(items)
      .values({ ...input, categoryId: coffeeCategoryId })
      .returning();
    return coffee;
  }

  // Gives back undefined when there's no such coffee.
  public async updateCoffee(id: number, input: CoffeeInput) {
    const [coffee] = await this.getDb()
      .update(items)
      .set(input)
      .where(and(eq(items.id, id), isCoffee))
      .returning();
    return coffee;
  }

  public async deleteCoffee(id: number) {
    await this.getDb().delete(items).where(and(eq(items.id, id), isCoffee));
  }

  // Tuesday's foreign key: receipt_items points at items, so Postgres refuses
  // to delete a coffee that's on an old receipt. Asking first lets the route
  // say why, instead of crashing.
  public async hasBeenSold(id: number) {
    const [line] = await this.getDb()
      .select()
      .from(receiptItems)
      .where(eq(receiptItems.itemId, id))
      .limit(1);
    return line !== undefined;
  }
}
