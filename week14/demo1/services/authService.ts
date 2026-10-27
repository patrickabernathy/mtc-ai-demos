// The ONE file that knows who is logged in.
// Routes ask it "who is this?" -- they never read the cookie themselves.
import { randomBytes, scryptSync } from "crypto";
import { cookies } from "next/headers";
import { and, eq, gt, sql } from "drizzle-orm";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { roles, sessions, userRoles, users } from "../drizzle/schema";

// What a route has to hand over to make an account. The route checks it first.
export type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Turn a password into a hash: a scramble that can't be turned back.
// The salt is random per password, so two people with the same
// password still get different hashes. We store "salt:hash".
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return salt + ":" + hash;
}

// To check a login, scramble what they typed with the SAME salt
// and see if it comes out the same. We never un-scramble anything.
function checkPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  return scryptSync(password, salt, 64).toString("hex") === hash;
}

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getDb() {
    return NeonDatabaseProvider.getInstance().getDb();
  }

  public async signUp(input: NewUser) {
    const [user] = await this.getDb()
      .insert(users)
      .values({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        passwordHash: hashPassword(input.password),
      })
      .returning({ id: users.id, email: users.email });
    return user;
  }

  // Checks the email and password. If they match, makes a session
  // and hands the browser a cookie with its id. Gives back true or false.
  public async logIn(email: string, password: string) {
    const [user] = await this.getDb().select().from(users).where(eq(users.email, email));
    if (!user || !user.passwordHash || !checkPassword(password, user.passwordHash)) {
      return false;
    }

    // 64 random characters. Nobody can guess it, so it can stand in
    // for "this person already proved who they are".
    const sessionId = randomBytes(32).toString("hex");
    await this.getDb().insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: sql`now() + interval '7 days'`,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", sessionId, {
      httpOnly: true, // the page's JavaScript can't read it
      sameSite: "lax", // other websites can't send it for you
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // the browser forgets it after 7 days too
    });
    return true;
  }

  // Who sent this request? Reads the cookie, looks up the session.
  // Gives back undefined when nobody is logged in.
  public async getCurrentUser() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;
    if (!sessionId) {
      return undefined;
    }

    const [user] = await this.getDb()
      .select({ id: users.id, email: users.email, firstName: users.firstName })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      // The server decides when a session is over, not the browser.
      .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, sql`now()`)));
    return user;
  }

  // Does this user have this job? "manager", "cashier", "customer"...
  public async hasRole(userId: number, roleName: string) {
    const rows = await this.getDb()
      .select()
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(and(eq(userRoles.userId, userId), eq(roles.name, roleName)));
    return rows.length > 0;
  }

  // Logging out has to end the session ON THE SERVER.
  // Deleting the cookie only makes this browser forget it.
  public async logOut() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;
    if (sessionId) {
      await this.getDb().delete(sessions).where(eq(sessions.id, sessionId));
    }
    cookieStore.delete("session");
  }
}
