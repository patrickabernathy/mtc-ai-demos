// Better Auth: the library that answers "who are you?"
// Hashing passwords, making sessions, the cookie, expiry, logging out:
// all of it happens in here, so we don't write it by hand like Tuesday.
// It does NOT answer "what are you allowed to do?" That's still our code.
import { betterAuth } from "better-auth";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";

export const auth = betterAuth({
  // The docs make a new Pool here. We already have one, so Better Auth
  // gets ours: same database, same connection string.
  database: NeonDatabaseProvider.getInstance().getPool(),

  // Log in with an email and a password.
  emailAndPassword: { enabled: true },

  // Better Auth can do far more than this app uses. These are switched
  // off completely, even for someone who is logged in. (Step 9.)
  disabledPaths: [
    "/update-user",
    "/change-email",
    "/change-password",
    "/set-password",
    "/delete-user",
    "/delete-user/callback",
  ],
});
