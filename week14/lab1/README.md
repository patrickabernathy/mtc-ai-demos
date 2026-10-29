# Week 14, lab 1 — Paws & Whiskers: who are you, and is this yours?

A pet shelter's website. Anyone can see the pets still waiting for a home. People who adopted a pet should be able to log in and see their own pet's private record: microchip number and vet notes. Right now the private records go to **anyone who asks**, and nobody can log in, because the login screen doesn't do anything yet.

Tonight you put **[Better Auth](https://www.better-auth.com)** in, yourself, from its own documentation, on a brand-new Neon database. Then you make the API answer two questions on every private request:

- **Can you get in?** Is somebody actually logged in? No: `401`.
- **Is this yours?** Logged in isn't enough. Somebody else's pet: `404`, the same answer as a pet that doesn't exist.

At the end, together, we protect the page itself two ways: first with a cookie check, which we then break with a fake cookie, then with a `UserContext` wrapper that knows who you really are.

**Better Auth is not installed.** Installing it and following its docs is part of the lab.

## Before you start

You need a **new Neon project** for this lab. Don't use the Corner Store one. Step 1 of the instructions walks through making it.

## How to run it

```
cd mtc-ai-demos/week14/lab1
npm install
```

Make `.env.local` (Step 1), run `db/init.sql` in Neon (Step 2), then:

```
npm run dev
```

Open <http://localhost:3000>. Keep the terminal where you can see it: when something fails, the real reason is printed there, not on the page.

## What's already here

| File | What it does |
|---|---|
| `db/init.sql` | Makes the shelter's tables (`pets`, `vets`) and fills them. **Not** the login tables: Better Auth makes those (Step 7). Safe to run twice. |
| `app/page.tsx` | The **public** page: the pets at the shelter. Works as soon as the database is set up. |
| `app/my-pets/page.tsx` | The page that should need a login: your pets and their private records. Nothing protects it yet. |
| `app/login/page.tsx` | The login screen. The form is built; the three buttons do nothing yet. |
| `app/api/pets/route.ts` | Public pets, public columns only. Done. |
| `app/api/my-pets/route.ts` | Your pets. Answers `501` until you build it. |
| `app/api/my-pets/[id]/route.ts` | One pet's private record, handed to **anyone**. That's the open door. |
| `services/petService.ts` | The only file that asks the database about pets. Done. |
| `providers/neon/neonDatabaseProvider.ts` | The only file that connects to Neon. Better Auth will share its connection. |

## What to do

**The full step-by-step guide is `instructions.pdf`** (also `instructions.html`, the same thing for a browser). Every step says what to build, how to check it, what you should see, what to ask your Claude if you're stuck, and links to that step's full code at the back.

| Step | You build | The idea |
|---|---|---|
| 1 | A new Neon project, and `.env.local` | Every app starts from an empty database |
| 2 | Run `db/init.sql` | The shelter's own tables and pets |
| 3 | Run it, and find the open door | Private records, handed to anyone |
| 4 | `npm install better-auth` | Reading a library's install guide |
| 5 | `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` | The secret that signs every login |
| 6 | `lib/auth.ts` | Better Auth, on our database, with email and password |
| 7 | `npx auth@latest generate`, then run its SQL in Neon | Better Auth writes its own tables; you read them first |
| 8 | `app/api/auth/[...all]/route.ts` | One file answers every `/api/auth/...` address |
| 9 | Close the doors you don't use | Deny by default |
| 10 | `lib/auth-client.ts` | The browser half |
| 11 | The login screen: sign up, log in, log out | The cookie, the session row, the hashed password |
| 12 | `services/authService.ts` and `GET /api/my-pets` | Can you get in? |
| 13 | `GET /api/my-pets/[id]` | Is this yours? |
| 14 | The five cases | Test it on purpose, including the attacks |
| 15–19 | **Together:** protect the page | A cookie check, a fake cookie, then a `UserContext` wrapper |

## The teaching point

**Better Auth answers "who are you?" It can never answer "is this yours?"** It has never heard of pets. That check is always our code, on every route that hands out something private:

```ts
if (!pet || pet.ownerEmail !== user.email) {
  return Response.json({ error: `No pet of yours with id ${id}` }, { status: 404 });
}
```

**And the page check isn't the lock.** Hiding a page from logged-out people is good manners. The API refusing them is the security. If you only had time for one, it's always the API.

## On the `answers` branch

This is the finished lab, as it stands after Step 19: Better Auth installed (`lib/auth.ts`, `lib/auth-client.ts`), the deny-by-default route in `app/api/auth/[...all]/route.ts`, both API checks, and the pages reading `UserContext`. There's no `proxy.ts`, because Step 19 deletes it.

`better-auth_migrations/` holds the SQL that `npx auth@latest generate` wrote when this answer was built. Yours will have a different date in its name; the inside should match.

To run it you still need your own `.env.local` (Steps 1 and 5), `db/init.sql` and that SQL file run in your Neon project, and Ana and Ben signed up on `/login`.

## The `states/` folder

Reference only: Next builds only what's under `app/` (and a `proxy.ts` next to `package.json`), so these files do nothing until you copy them over.

| State | Copy to | What it shows |
|---|---|---|
| `01-cookie-proxy/proxy.ts` | `proxy.ts`, next to `package.json` | Step 15: the cookie-only check that a fake cookie walks through in Step 16 |
| `02-going-further-vets/authService.ts` | `services/authService.ts` | Going further 1: `isVet(email)`, a check against our own `vets` table |
| `02-going-further-vets/route.ts` | `app/api/my-pets/[id]/route.ts` | Going further 1: yours, **or** you're a vet |

Restart `npm run dev` after copying in the new `authService.ts`.

## Things that will bite you

- **`SELECT * FROM user;` gives back one strange row.** `user` is a word Postgres already uses: it means "the database login running this query." Put it in double quotes: `SELECT * FROM "user";`
- **Restart `npm run dev` after changing `.env.local`**, and after adding a new method to a service. Next keeps the old copy running otherwise.
- **The first `npm run dev` writes `AGENTS.md`.** It's notes from Next for AI coding tools. Leave it.
