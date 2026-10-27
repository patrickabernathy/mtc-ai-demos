// Better Auth: the library that answers "who are you?" now.
// Everything Tuesday's authService did by hand -- hashing passwords,
// making sessions, the cookie, expiry, a real logout -- happens in here.
// It does NOT answer "what are you allowed to do?" That's still our code.
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { account, session, users, verification } from "../drizzle/schema";

export const auth = betterAuth({
  // Where Better Auth keeps its rows: our database, through Drizzle.
  // Its "user" is our users table, so Jennifer is still user 42.
  database: drizzleAdapter(NeonDatabaseProvider.getInstance().getDb(), {
    provider: "pg",
    schema: { user: users, session, account, verification },
  }),

  // Log in with an email and a password.
  emailAndPassword: { enabled: true },

  user: {
    // Better Auth calls it "name". Our table calls it first_name.
    fields: { name: "firstName" },
    // Our table also needs a last name, so sign-up has to send one.
    additionalFields: {
      lastName: { type: "string", required: true },
    },
  },

  // Our tables count ids up: 1, 2, 3. Tell Better Auth to do the same.
  advanced: { database: { generateId: "serial" } },

  // Too many tries too fast gets a "slow down". It's on by default in
  // production only; we turn it on here so we can watch it work.
  rateLimit: { enabled: true },
});
