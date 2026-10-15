// The ONE file that knows how to reach the database.
// A provider wraps something outside our app: here, Neon.
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

export class NeonDatabaseProvider {
  // One copy for the whole app, made the first time somebody asks.
  private static instance: NeonDatabaseProvider;
  private db: NeonHttpDatabase | undefined;

  public static getInstance(): NeonDatabaseProvider {
    if (!NeonDatabaseProvider.instance) {
      NeonDatabaseProvider.instance = new NeonDatabaseProvider();
    }
    return NeonDatabaseProvider.instance;
  }

  public getDb(): NeonHttpDatabase {
    if (!this.db) {
      // If the secret is missing, say so in plain words here,
      // instead of failing somewhere weird later.
      const url = process.env.NEON_DATABASE_URL;
      if (!url) {
        throw new Error(
          "NEON_DATABASE_URL is not set. Copy .env.example to .env.local and fill it in."
        );
      }
      // logger: true prints every query and its params in the terminal (Step 11).
      this.db = drizzle(neon(url), { logger: true });
    }
    return this.db;
  }
}
