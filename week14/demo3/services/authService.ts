// The ONE file that knows who is logged in. Same job as Tuesday.
// The inside changed: Better Auth reads the cookie and checks the session.
// Routes still ask this file "who is this?" -- so not one of them had to change.
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import { roles, userRoles } from "../drizzle/schema";

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

  // Who sent this request? Better Auth looks at the cookie and the
  // session table, and checks it hasn't expired. That's identity.
  // Gives back undefined when nobody is logged in.
  public async getCurrentUser() {
    const result = await auth.api.getSession({ headers: await headers() });
    if (!result) {
      return undefined;
    }
    return {
      // Better Auth hands ids back as text ("42"). Our tables use numbers,
      // and "42" !== 42 -- so turn it back into a number here, once.
      id: Number(result.user.id),
      email: result.user.email,
      firstName: result.user.name,
    };
  }

  // Does this user have this job? "manager", "cashier", "customer"...
  // Better Auth has never heard of our roles. This is authorization,
  // and it's exactly the same code as Tuesday.
  public async hasRole(userId: number, roleName: string) {
    const rows = await this.getDb()
      .select()
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(and(eq(userRoles.userId, userId), eq(roles.name, roleName)));
    return rows.length > 0;
  }
}
