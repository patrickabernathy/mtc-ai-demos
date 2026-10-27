// The ONE file that knows how to ask the database about items.
// Routes call these methods. Routes never write a query themselves.
import { and, eq, sql } from "drizzle-orm";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { items } from "../drizzle/schema";

// The store's rule about what a customer can see, written once.
// Every read below uses it, so changing it here changes it everywhere.
const onSale = eq(items.isAvailable, true);

// What a route has to hand over to add an item. The route checks it first.
export type NewItem = {
  categoryId: number;
  name: string;
  price: number;
  description?: string;
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

  public async getByCategory(categoryId: number) {
    return this.getDb()
      .select()
      .from(items)
      .where(and(eq(items.categoryId, categoryId), onSale))
      .orderBy(items.id);
  }

  // .returning() hands back the row Postgres saved, new id included.
  public async create(input: NewItem) {
    const [item] = await this.getDb().insert(items).values(input).returning();
    return item;
  }

  public async updatePrice(id: number, price: number) {
    const [item] = await this.getDb()
      .update(items)
      .set({ price })
      .where(and(eq(items.id, id), onSale))
      .returning();
    return item;
  }

  // Tuesday: Postgres refuses to delete an item that's on old receipts.
  // So "delete" here means "take it off the menu", and the history stays.
  public async retire(id: number) {
    const [item] = await this.getDb()
      .update(items)
      .set({ isAvailable: false })
      .where(and(eq(items.id, id), onSale))
      .returning();
    return item;
  }

  // A teammate's search box. Builds the SQL by gluing the words in.
  public async search(words: string) {
    const result = await this.getDb().execute(
      sql.raw(
        `SELECT id, name, price FROM items WHERE is_available = true AND name ILIKE '%${words}%'`
      )
    );
    return result.rows;
  }
}
