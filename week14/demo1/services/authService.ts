// The ONE file that knows who is logged in.
// Routes ask it "who is this?" -- they never read the cookie themselves.
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { roles, sessions, userRoles, users } from "../drizzle/schema";

// What a route has to hand over to make an account. The route checks it first.
export type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

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
        password: input.password,
      })
      .returning({ id: users.id, email: users.email });
    return user;
  }

  // Checks the email and password. If they match, makes a session
  // and hands the browser a cookie with its id. Gives back true or false.
  public async logIn(email: string, password: string) {
    const [user] = await this.getDb().select().from(users).where(eq(users.email, email));
    if (!user || user.password !== password) {
      return false;
    }

    // 64 random characters. Nobody can guess it, so it can stand in
    // for "this person already proved who they are".
    const sessionId = randomBytes(32).toString("hex");
    await this.getDb().insert(sessions).values({ id: sessionId, userId: user.id });

    const cookieStore = await cookies();
    cookieStore.set("session", sessionId, {
      httpOnly: true, // the page's JavaScript can't read it
      sameSite: "lax", // other websites can't send it for you
      path: "/",
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
      .where(eq(sessions.id, sessionId));
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

  public async logOut() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  }
}
