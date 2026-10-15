# Week 12, lab 1 — The coffee bar: a menu editor that remembers

One lab that builds on itself, covering this week's lecture in one Next 16 app. The Corner Store owner wants a screen to manage the coffees on the menu: see them all, add a new one, change one, delete one, and search them. The pages are already built, and the API routes already check every request the week 11 way. **What's missing is the database.** You connect it the way Wednesday's demo did: Drizzle, drizzle-kit, `drizzle.config.ts`, `npm run db:pull`, a Neon provider, and an `ItemService` that every route calls.

Last week the data was an array, so a restart wiped every change. Tonight every change lands in Postgres, so it's still there tomorrow.

## Before you start

You need the Corner Store database from Tuesday: a database called `store` in your Neon project, with `store.sql` run in it. The same file is in this folder as `db/0001_store.sql`. Running it again puts every table back the way it started (Neon → SQL Editor → pick `store` → paste the file → Run).

## How to run it

```
cd mtc-ai-demos/week12/lab1
npm install
npm run dev
```

Open <http://localhost:3000>. You should see the search box and **"No coffees found."** That's correct for now: the page works, the routes work, and nothing connects them to the database yet.

Only one project can hold port 3000, so stop any other `npm run dev` first. Keep that terminal where you can see it; when the API breaks, the reason is printed there, not on the page.

## What's already here

| File | What it does |
|---|---|
| `app/page.tsx` | The list: a search box, a max-price box, a card per coffee with **Edit** and **Delete**. It calls `/api/coffees`. **You won't change it.** |
| `app/new/page.tsx` | The new-coffee form. It POSTs to `/api/coffees`. |
| `app/edit/[id]/page.tsx` | The edit form. It GETs `/api/coffees/3` to fill itself in, then PUTs the whole form back. |
| `app/api/coffees/route.ts` | `GET` answers `[]`. `POST` checks the body, then answers 501, "not built yet". |
| `app/api/coffees/[id]/route.ts` | `GET`, `PUT` (body already checked) and `DELETE`, all 501 for now. |
| `db/0001_store.sql` | Tuesday's `store.sql`. The SQL that builds the database. |
| `.env.example` | The name of the one secret this app needs, with the value left blank. |

Every 501 says which step builds it.

## What to do

**The full step-by-step guide is `instructions.pdf`** (also `instructions.html`, the same thing for a browser). Every step says what to build, how to check it and exactly what you should see, what to ask your Claude if you're stuck, and links to that step's full code at the back.

| Step | You build | The idea |
|---|---|---|
| 0 | Run it, meet the pages and `db/` | The UI is done; the database isn't connected |
| 1 | Install Drizzle, drizzle-kit, the Neon driver, dotenv | The ORM your app uses, and the tool you run from the terminal |
| 2 | `.env.local` with `NEON_DATABASE_URL` | The connection string is a password: out of Git, pointed at `store` |
| 3 | `drizzle.config.ts` and a `db:pull` script | Tell drizzle-kit where the database is and where to write |
| 4 | `npm run db:pull`, then `mode: "number"` on price | drizzle-kit writes the schema; every pull means redoing your edits |
| 5 | `providers/neon/neonDatabaseProvider.ts` | The one file that connects |
| 6 | `services/itemService.ts` and `GET /api/coffees` | The one file that queries; the "is a coffee" rule written once |
| 7 | `GET /api/coffees/[id]` | One row, or a 404 you choose |
| 8 | `POST /api/coffees` | `insert` and `.returning()`; restart, and it's still there |
| 9 | `PUT /api/coffees/[id]` | `update`, scoped by the same rule |
| 10 | `DELETE /api/coffees/[id]` | Tuesday's foreign key says no; a 409 that says why |
| 11 | `?search=` | Query parameters, `ilike`, and watching the SQL and its params |
| 12 | `?maxPrice=` | A second, optional parameter; `and()` skips what's missing |

## The teaching point

The pages don't know there's a database. The routes shouldn't either. Each layer knows one thing:

| Layer | Knows | Doesn't know |
|---|---|---|
| Page | the addresses under `/api/coffees` | how the API gets its answers |
| Route | HTTP: the request, the body, the status code | SQL, Drizzle, the schema |
| Service | how to ask the database about items, and the store's rules | HTTP, status codes |
| Provider | how to connect to Neon | anything about coffee |

## Things that will bite you

- **The wrong database.** Neon's Connect box starts on `neondb`. Change the dropdown to `store` before you copy. A pull that says `1 tables fetched` or `0` is the tell.
- **Restart after changing `.env.local`.** Next only reads it when it starts.
- **Every pull erases your edit** to `drizzle/schema.ts`. Keep pulling when the database changes; just redo the list below each time.

## After every `npm run db:pull`

`db:pull` rewrites `drizzle/schema.ts` from scratch. Redo these edits every time, then `npm run build` to check:

1. `items.price`: add `mode: "number"`, so it reads `numeric({ precision: 6, scale: 2, mode: "number" })`. Without it the page crashes with `toFixed is not a function`.
- **A forgotten `await`** sends back `{}` instead of your coffees.
- **Changes are real now.** What you add, change and delete stays in your database. Run `db/0001_store.sql` again any time you want the store back the way it started.
- **The first `npm run dev` writes `AGENTS.md`.** It's notes from Next for AI coding tools. Leave it.
