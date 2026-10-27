// Settings for drizzle-kit, the command-line half of Drizzle.
// Next reads .env.local by itself. drizzle-kit doesn't, so dotenv loads it here.
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",             // which kind of database
  schema: "./drizzle/schema.ts",     // where our tables are described
  out: "./drizzle",                  // where drizzle-kit writes what it generates
  dbCredentials: { url: process.env.NEON_DATABASE_URL || "" },
});
