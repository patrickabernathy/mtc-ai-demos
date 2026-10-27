# Week 14, demo 3 — Let Better Auth log people in

The Corner Store from `week14/demo2`, with Tuesday's hand-made login code taken out and **[Better Auth](https://www.better-auth.com)** put in its place. Better Auth is a library: it does the hashing, the sessions, the cookie, the expiry and the logout for us, and it does them more carefully than we did by hand.

The point of the demo is the line between two questions:

- **Who are you?** That's identity. Better Auth answers it now.
- **What are you allowed to do?** That's authorization. Better Auth has never heard of our roles or our receipts. That part is still our code, and in this store two doors are still open.

## What changed from demo2

| Before (demo2) | Now (demo3) |
|---|---|
| `services/authService.ts` hashed passwords, made sessions, set the cookie | `lib/auth.ts` sets up Better Auth, and it does all of that |
| `/api/login`, `/api/logout`, `/api/signup` | One file, `app/api/auth/[...all]/route.ts`, answers everything under `/api/auth/...` |
| Our `sessions` table | Better Auth's `session`, `account` and `verification` tables (`db/better-auth.sql`) |
| The password hash on `users` | The password hash on `account`, one row per way to log in |

What **didn't** change: every route under `app/api/items` and `app/api/receipts`. They still ask `AuthService.getCurrentUser()` "who is this?", and `AuthService` now asks Better Auth. Jennifer is still user 42, and `hasRole` is word for word the same as Tuesday.

## Before you start

In Neon, on your `store` database (the dropdown in the SQL Editor), run `db/better-auth.sql` from this folder. It needs `store.sql` from week 12 first; it does **not** need Tuesday's `auth.sql`. It adds three columns to `users`, makes Better Auth's three tables, and gives the same two people their passwords back:

| Who | Email | Password | Role |
|---|---|---|---|
| Jennifer Rivera, user 42 | `jennifer.rivera42@example.com` | `latte4ever` | customer |
| Priya Raman, user 3 | `priya.raman@example.com` | `manager123` | manager |

The passwords are fake. Running the file again resets every Better Auth login.

## How to run it

```
cd mtc-ai-demos/week14/demo3
npm install
```

Copy `.env.example` to `.env.local` and fill in **all three** lines. `NEON_DATABASE_URL` is the same one as demo2. For `BETTER_AUTH_SECRET`, make a fresh random one:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then:

```
npm run dev
```

Open <http://localhost:3000/login>. Keep the terminal visible: Better Auth writes the real reason a login failed there.

`npm run build` needs `.env.local` too. Better Auth connects to the database the moment the app loads, so without it the build stops with *"NEON_DATABASE_URL is not set."*

## What to do

### 1. Log in, and look at what Better Auth made

Log in on `/login` as Jennifer. Then look in three places:

- **DevTools → Application → Cookies:** a cookie called `better-auth.session_token`. Tuesday's coat-check ticket, made by someone else.
- **Neon:** `SELECT * FROM session;` One row for your login, with an `expires_at` seven days away.
- **Neon:** `SELECT user_id, provider_id, left(password, 20) FROM account;` The hashed password lives here now, next to the word `credential`.

Then open <http://localhost:3000/api/receipts>. Still only her receipts: that's our ownership check, unchanged.

### 2. Try Wednesday's attacks again

In Postman, `POST http://localhost:3000/api/auth/sign-in/email` with each body below, and read every answer:

| Body | Wednesday's demo2 said | What does Better Auth say? |
|---|---|---|
| `{ "email": "bob@example.com", "password": "not-my-password" }` | "No account with the email…" | |
| `{ "email": "jennifer.rivera42@example.com", "password": "not-my-password" }` | "Wrong password" | |
| `{ "email": "jennifer.rivera42@example.com", "password": 12345 }` | a full stack trace | |

Now look at the terminal running `npm run dev`. Then send a wrong password four times in a row, fast.

### 3. Find the open doors

Log out (or use Postman with no cookie at all) and try:

- `POST http://localhost:3000/api/items` with `{ "name": "Free Coffee", "price": 0.01, "categoryId": 1 }`
- `DELETE http://localhost:3000/api/items/3`

Better Auth logs people in perfectly. Did that stop either of these?

**Fix it** in `app/api/items/route.ts` (`POST`) and `app/api/items/[id]/route.ts` (`DELETE`): copy the two checks from the top of `PATCH` (logged in? a manager?) into each one. Then try both again with no cookie (`401`), logged in as Jennifer (`403`), and logged in as Priya (works).

## A Postman trap

Once Postman holds the login cookie, Better Auth refuses any `POST` to `/api/auth/...` that has no `Origin` header, with `403 Missing or null Origin`. A browser always sends one; Postman doesn't. It's Better Auth protecting you from another website quietly sending requests with your cookie (the same worry as `sameSite` on Tuesday). In Postman, add a header `Origin` with the value `http://localhost:3000`, or log out in the browser instead.

## The teaching point

**Hand off identity. Never hand off authorization.** Better Auth can tell you this request is from user 42, and it handles the password, the session and the cookie better than our hand-written version did. It can't know that changing prices is a manager's job or that receipt 1 isn't Jennifer's. That's this part, and it's still ours, on every route:

```ts
// Better Auth: who is this?
const user = await AuthService.getInstance().getCurrentUser();
if (!user) {
  return Response.json({ error: "Log in first" }, { status: 401 });
}
// Us: are they allowed?
if (!(await AuthService.getInstance().hasRole(user.id, "manager"))) {
  return Response.json({ error: "Only a manager can change prices" }, { status: 403 });
}
```

**Better Auth hands ids back as text.** `"42"` is not `42`, so `receipt.customerId !== user.id` would turn away every customer from their own receipts. `AuthService.getCurrentUser()` turns the id back into a number, in one place, so no route has to remember.

**The secret is a real secret.** Without `BETTER_AUTH_SECRET`, Better Auth falls back to a built-in one on your laptop, so everything seems fine. Deployed, it refuses to start. Every deployment gets its own secret, in that deployment's environment variables, never in the code.

## The `states/` folder

Reference only: Next builds only what's under `app/`, so these files do nothing until you copy them over the real ones.

| State | Copy to | What it shows |
|---|---|---|
| `01-doors-closed/items-route.ts` | `app/api/items/route.ts` | `POST` for managers only |
| `01-doors-closed/items-id-route.ts` | `app/api/items/[id]/route.ts` | `DELETE` for managers only |
