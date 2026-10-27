// The browser half of Better Auth. Pages call authClient.signIn.email(...)
// and it sends the request to /api/auth/... for them.
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
