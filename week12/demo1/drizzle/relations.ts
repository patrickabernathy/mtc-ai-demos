import { relations } from "drizzle-orm/relations";
import { categories, items, locations, receipts, users, reviews, userRoles, roles, receiptItems } from "./schema";

export const itemsRelations = relations(items, ({one, many}) => ({
	category: one(categories, {
		fields: [items.categoryId],
		references: [categories.id]
	}),
	reviews: many(reviews),
	receiptItems: many(receiptItems),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	items: many(items),
}));

export const receiptsRelations = relations(receipts, ({one, many}) => ({
	location: one(locations, {
		fields: [receipts.locationId],
		references: [locations.id]
	}),
	user_cashierId: one(users, {
		fields: [receipts.cashierId],
		references: [users.id],
		relationName: "receipts_cashierId_users_id"
	}),
	user_customerId: one(users, {
		fields: [receipts.customerId],
		references: [users.id],
		relationName: "receipts_customerId_users_id"
	}),
	receiptItems: many(receiptItems),
}));

export const locationsRelations = relations(locations, ({many}) => ({
	receipts: many(receipts),
}));

export const usersRelations = relations(users, ({many}) => ({
	receipts_cashierId: many(receipts, {
		relationName: "receipts_cashierId_users_id"
	}),
	receipts_customerId: many(receipts, {
		relationName: "receipts_customerId_users_id"
	}),
	reviews: many(reviews),
	userRoles: many(userRoles),
}));

export const reviewsRelations = relations(reviews, ({one}) => ({
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id]
	}),
	item: one(items, {
		fields: [reviews.itemId],
		references: [items.id]
	}),
}));

export const userRolesRelations = relations(userRoles, ({one}) => ({
	user: one(users, {
		fields: [userRoles.userId],
		references: [users.id]
	}),
	role: one(roles, {
		fields: [userRoles.roleId],
		references: [roles.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	userRoles: many(userRoles),
}));

export const receiptItemsRelations = relations(receiptItems, ({one}) => ({
	receipt: one(receipts, {
		fields: [receiptItems.receiptId],
		references: [receipts.id]
	}),
	item: one(items, {
		fields: [receiptItems.itemId],
		references: [items.id]
	}),
}));