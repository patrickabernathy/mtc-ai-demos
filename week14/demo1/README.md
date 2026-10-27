# Week 14, demo 1 — Who are you, and what are you allowed to do?

The week 12 Corner Store (the menu, the Neon provider, the item service) **with logins added**. You can sign up, log in, see your own receipts, and log out.

It works. That's the point. Tonight's three demos are all cases where the login works perfectly and the wrong person still gets in:

1. A logged-in customer reads **everyone's** receipts by changing a number in the address.
2. Every password is sitting in the database **exactly as people typed it**.
3. **Logging out doesn't end anything.** An old copy of the cookie still works, forever.

Two questions run through all of it. **Authentication**: who are you? (Logging in.) **Authorization**: now that I know who you are, are you allowed to do *this*, to *this* thing? Most bugs here come from answering the first and forgetting the second.

**This is the `answers` branch: the finished version.** The steps under "What to do" are the exercise as it was set on `main`; "The finished version" below shows where it ends up. You still need the database setup and your own `.env.local`, and because the passwords are now hashed, run `db/hash.sql` after `db/auth.sql`.

## The finished version

| File | What changed |
|---|---|
| `app/api/receipts/[id]/route.ts` | Checks the receipt belongs to you. Someone else's receipt is a `404`, exactly like one that doesn't exist (`states/01-owner-check`) |
| `app/api/items/[id]/route.ts` | `PATCH` needs a logged-in manager: `401` if nobody is logged in, `403` if you're logged in but not a manager (`states/02-managers-only`) |
| `services/authService.ts` | Passwords stored as `salt:hash` and checked by hashing again; every session gets an `expiresAt` and only unexpired ones count; `logOut` deletes the session row (`states/04-expires`, which includes `03-hashed`) |

Things worth trying once it runs:

- As Jennifer, open `/api/receipts`, then change the address to a receipt id that isn't in your list. `404`.
- As Jennifer in Postman, `PATCH /api/items/1` with `{"price": 0.01}`: `403`. Log in as Priya and it works.
- Copy the `session` cookie, log out, and replay it with `curl.exe`: `401`.

Still open on purpose: `POST /api/items` and `DELETE /api/items/[id]` check nothing. Wednesday's demo starts from that.

## Before you start

You need the Corner Store database from week 12: a database called `store` in your Neon project, with `store.sql` run in it.

Then, in Neon → SQL Editor → **pick `store` in the dropdown** → paste `db/auth.sql` → Run. It adds:

- a `sessions` table: one row per logged-in browser
- `password` and `password_hash` columns on `users`
- two people you can log in as (fake passwords, fake people):

| Who | Email | Password | Role |
|---|---|---|---|
| Jennifer Rivera (user 42) | `jennifer.rivera42@example.com` | `latte4ever` | customer |
| Priya Raman (user 3) | `priya.raman@example.com` | `manager123` | manager |

`store.sql` then `db/auth.sql` is the reset button. It puts every price, password and login back to the start.

## How to run it

```
cd mtc-ai-demos/week14/demo1
npm install
```

Copy `.env.local` over from `week12/demo1` (it holds `NEON_DATABASE_URL`, ending in `/store`). If you don't have one, copy `.env.example` to `.env.local` and paste your connection string in. Then:

```
npm run dev
```

Open <http://localhost:3000/login> and log in as Jennifer. Then open <http://localhost:3000/api/receipts>.

Stop any other `npm run dev` first; only one project can hold port 3000.

## What's here

| File | What it does |
|---|---|
| `db/auth.sql` | The sessions table, the password columns, the two accounts. Run once, after `store.sql` |
| `db/hash.sql` | For after the hashing fix: stores hashes for Jennifer and Priya and blanks every plain password |
| `services/authService.ts` | **The one file that knows who's logged in.** `signUp`, `logIn`, `getCurrentUser`, `hasRole`, `logOut` |
| `services/receiptService.ts` | Receipts: one customer's list, and one receipt by id |
| `app/api/signup`, `login`, `logout`, `me` | Thin routes that call `AuthService` |
| `app/api/receipts/route.ts` | `GET` your ten most recent receipts |
| `app/api/receipts/[id]/route.ts` | `GET` one receipt |
| `app/api/items/...` | Week 12's item routes, unchanged |
| `app/login/page.tsx` | A plain login form, a log-out button, and a link to your receipts |
| `drizzle/schema.ts` | Week 12's pulled schema, plus `password`, `passwordHash` and `sessions` added by hand |

How a login works: when the password matches, `logIn` makes 64 random characters, saves them in `sessions` next to the user's id, and sends them to the browser in a cookie called `session`. The browser sends that cookie back with every request. `getCurrentUser` reads it and looks up the row: ticket, to row, to person. Look at both halves: DevTools → Application → Cookies, and `SELECT * FROM sessions;` in Neon. Same 64 characters.

## What to do

### 1. Only a manager can change a price

Log in to Postman as Jennifer: `POST /api/login` with `{"email": "jennifer.rivera42@example.com", "password": "latte4ever"}` (Postman keeps the cookie, like a browser). Then `PATCH /api/items/1` with `{"price": 0.01}`. A customer just changed a price.

In `app/api/items/[id]/route.ts`, at the top of `PATCH`: if nobody is logged in, answer `401`. If they aren't a manager (`AuthService.getInstance().hasRole(user.id, "manager")`), answer `403`. Try it as Jennifer, then as Priya.

**Done:** Jennifer gets `403`, Priya gets the new price.

### 2. Stop storing passwords

Sign someone up: `POST /api/signup` with `{"email": "you.test@example.com", "password": "anything-fake", "firstName": "You", "lastName": "Test"}`. In Neon: `SELECT id, email, password FROM users WHERE password IS NOT NULL;`. Every password, readable.

In `services/authService.ts`, store a **salted hash** instead: a one-way scramble you can check against but never read back. Use `scryptSync` and `randomBytes` from Node's built-in `"crypto"`. Store it as `salt:hash` in `passwordHash`. At login, scramble what they typed with the same salt and compare. Then run `db/hash.sql`, sign up a *new* person, and look at the table again.

**Done:** a `salt:hash` in `password_hash`, nothing in `password`, and Jennifer can still log in.

### 3. Make logging out mean logged out

Log in on `/login`. Copy the `session` cookie's value from DevTools. Log out. Then in a terminal:

```
curl.exe -H "Cookie: session=PASTE-IT-HERE" http://localhost:3000/api/me
```

(`curl.exe` on Windows PowerShell; plain `curl` elsewhere.) You're still Jennifer.

In `authService.ts`: give every session an `expiresAt` when it's made, only accept sessions whose `expiresAt` is still in the future, and make `logOut` delete the session's row, not just the cookie.

**Done:** the copied cookie gets `401` after logging out. Log in again, run `UPDATE sessions SET expires_at = now() - interval '1 minute';` in Neon, and it gets `401` again.

## The teaching point

**Logged in is not the same as allowed.** The receipt route checks that you're logged in, then hands over whatever receipt number is in the address. The list route was only safe because it happened to ask for `getForCustomer(user.id)`. The fix is one condition:

```ts
if (!receipt || receipt.customerId !== user.id) {
  return Response.json({ error: `No receipt with id ${id}` }, { status: 404 });
}
```

`404`, not `403`: someone else's receipt should look exactly like one that doesn't exist.

**Never store a password.** Store something you can check, but can't read back. The salt makes two people with the same password get different hashes.

**The server decides when a login ends.** Deleting the cookie only makes one browser forget. The session row is what has to go.

**Start from no.** Every route is closed until you open it on purpose, for named people. A library like Better Auth (suggested for the capstone) does the logging-in for you. It can't know who owns a receipt. That check is always yours.

## The `states/` folder

The code at each checkpoint. Copy one over your own file if your typing goes sideways. `states/` is reference only: Next builds only what is under `app/` (and the files it imports), so nothing in here runs until you copy it into place.

| State | Copy over | What it shows |
|---|---|---|
| `01-owner-check/receipts-id-route.ts` | `app/api/receipts/[id]/route.ts` | Your receipts only; someone else's is a 404 |
| `02-managers-only/items-id-route.ts` | `app/api/items/[id]/route.ts` | `PATCH` needs a logged-in manager: 401, then 403 |
| `03-hashed/authService.ts` | `services/authService.ts` | `hashPassword` / `checkPassword`; sign-up stores a hash. Run `db/hash.sql` after |
| `04-expires/authService.ts` | `services/authService.ts` | Everything in 03, plus sessions that expire and a logout that deletes the row |
