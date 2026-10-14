// Goes in: drizzle/schema.ts
// The same two tables store.sql built on Tuesday, written again in TypeScript.
// Left of the colon: the name our code uses. In quotes: the column in Postgres.
import { boolean, integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  name: text("name").notNull().unique(),
  description: text("description"),
  // numeric(6,2), exactly like Tuesday. Watch what JavaScript gets back.
  price: numeric("price", { precision: 6, scale: 2 }).notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
