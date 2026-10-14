// The ONE file that knows how to reach the database.
// A provider wraps something outside our app: here, Neon.
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

export class NeonProvider {
  // One copy for the whole app, made the first time somebody asks.
  private static instance: NeonProvider;
  private db: NeonHttpDatabase | undefined;

  public static getInstance(): NeonProvider {
    if (!NeonProvider.instance) {
      NeonProvider.instance = new NeonProvider();
    }
    return NeonProvider.instance;
  }

  public getDb(): NeonHttpDatabase {
    if (!this.db) {
      // A real check instead of the ! we were using: if the secret is
      // missing, say so in plain words instead of failing somewhere weird.
      const url = process.env.NEON_DATABASE_URL;
      if (!url) {
        throw new Error(
          "NEON_DATABASE_URL is not set. Copy .env.example to .env.local and fill it in."
        );
      }
      this.db = drizzle(neon(url));
    }
    return this.db;
  }
}
