// The same two tables store.sql built on Tuesday, written again in TypeScript.
// Left of the colon: the name our code uses. In quotes: the column in Postgres.
// Only the services import this file.
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
  // Postgres sends numeric back as text ("2.50") so it can't lose a penny.
  // mode: "number" tells Drizzle to turn it into a JavaScript number for us.
  price: numeric("price", { precision: 6, scale: 2, mode: "number" }).notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
