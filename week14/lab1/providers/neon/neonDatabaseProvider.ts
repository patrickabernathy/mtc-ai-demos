// The ONE file that knows how to reach the database.
// A provider wraps something outside our app: here, Neon.
// This time it's a Pool from the "pg" package, because that's what
// Better Auth's docs use too. One pool, shared by our code and Better Auth.
import { Pool } from "pg";

export class NeonDatabaseProvider {
  // One copy for the whole app, made the first time somebody asks.
  private static instance: NeonDatabaseProvider;
  private pool: Pool | undefined;

  public static getInstance(): NeonDatabaseProvider {
    if (!NeonDatabaseProvider.instance) {
      NeonDatabaseProvider.instance = new NeonDatabaseProvider();
    }
    return NeonDatabaseProvider.instance;
  }

  public getPool(): Pool {
    if (!this.pool) {
      // If the secret is missing, say so in plain words here,
      // instead of failing somewhere weird later.
      const url = process.env.NEON_DATABASE_URL;
      if (!url) {
        throw new Error(
          "NEON_DATABASE_URL is not set. Copy .env.example to .env.local and fill it in."
        );
      }
      this.pool = new Pool({ connectionString: url });
    }
    return this.pool;
  }
}
