// The ONE file that knows who is logged in. Same job as Tuesday's.
// Routes ask this file "who is this?" and never read the cookie themselves.
import { headers } from "next/headers";
import { auth } from "../lib/auth";

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Who sent this request? Better Auth reads the cookie, looks the session
  // up in the session table, and checks it hasn't expired.
  // Gives back undefined when nobody is logged in -- or when the cookie
  // is fake, expired, or for a session that was logged out.
  public async getCurrentUser() {
    const result = await auth.api.getSession({ headers: await headers() });
    if (!result) {
      return undefined;
    }
    return {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
    };
  }
}
