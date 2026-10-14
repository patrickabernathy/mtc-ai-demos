// Goes in: drizzle/schema.ts
// What `npm run db:pull` wrote, with ONE edit: items.price gets mode: "number".
// Pulling again would overwrite this edit, so after this the file is ours.
import { pgTable, unique, serial, text, date, foreignKey, check, integer, numeric, boolean, timestamp, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const locations = pgTable("locations", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	street: text().notNull(),
	openedOn: date("opened_on").notNull(),
	phone: text(),
}, (table) => [
	unique("locations_name_key").on(table.name),
]);

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("categories_name_key").on(table.name),
]);

export const items = pgTable("items", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id").notNull(),
	name: text().notNull(),
	description: text(),
	// Postgres sends numeric back as text ("2.50") so it can't lose a penny.
	// mode: "number" tells Drizzle to turn it into a JavaScript number for us.
	price: numeric({ precision: 6, scale: 2, mode: "number" }).notNull(),
	isAvailable: boolean("is_available").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "items_category_id_fkey"
		}),
	unique("items_name_key").on(table.name),
	check("items_price_check", sql`price >= (0)::numeric`),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	phone: text(),
	birthday: date(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const roles = pgTable("roles", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("roles_name_key").on(table.name),
]);

export const receipts = pgTable("receipts", {
	id: serial().primaryKey().notNull(),
	locationId: integer("location_id").notNull(),
	cashierId: integer("cashier_id").notNull(),
	customerId: integer("customer_id"),
	paymentMethod: text("payment_method").default('card').notNull(),
	tip: numeric({ precision: 6, scale:  2 }).default('0').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.locationId],
			foreignColumns: [locations.id],
			name: "receipts_location_id_fkey"
		}),
	foreignKey({
			columns: [table.cashierId],
			foreignColumns: [users.id],
			name: "receipts_cashier_id_fkey"
		}),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [users.id],
			name: "receipts_customer_id_fkey"
		}),
	check("receipts_payment_method_check", sql`payment_method = ANY (ARRAY['cash'::text, 'card'::text, 'app'::text])`),
	check("receipts_tip_check", sql`tip >= (0)::numeric`),
	check("receipts_check", sql`(payment_method <> 'app'::text) OR (customer_id IS NOT NULL)`),
]);

export const reviews = pgTable("reviews", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	itemId: integer("item_id").notNull(),
	rating: integer().notNull(),
	body: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reviews_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.itemId],
			foreignColumns: [items.id],
			name: "reviews_item_id_fkey"
		}),
	unique("reviews_user_id_item_id_key").on(table.userId, table.itemId),
	check("reviews_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
]);

export const spreadsheetSales = pgTable("spreadsheet_sales", {
	saleDate: text("sale_date"),
	customer: text(),
	email: text(),
	item: text(),
	total: text(),
	cashier: text(),
	location: text(),
});

export const userRoles = pgTable("user_roles", {
	userId: integer("user_id").notNull(),
	roleId: integer("role_id").notNull(),
	assignedAt: timestamp("assigned_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_roles_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "user_roles_role_id_fkey"
		}),
	primaryKey({ columns: [table.userId, table.roleId], name: "user_roles_pkey"}),
]);

export const receiptItems = pgTable("receipt_items", {
	receiptId: integer("receipt_id").notNull(),
	itemId: integer("item_id").notNull(),
	quantity: integer().default(1).notNull(),
	unitPrice: numeric("unit_price", { precision: 6, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.receiptId],
			foreignColumns: [receipts.id],
			name: "receipt_items_receipt_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.itemId],
			foreignColumns: [items.id],
			name: "receipt_items_item_id_fkey"
		}),
	primaryKey({ columns: [table.receiptId, table.itemId], name: "receipt_items_pkey"}),
	check("receipt_items_quantity_check", sql`quantity > 0`),
	check("receipt_items_unit_price_check", sql`unit_price >= (0)::numeric`),
]);
