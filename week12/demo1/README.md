# Week 12, demo 1 — The store talks to its database

A small Corner Store app with **the page already built and the API already scaffolded**, but nothing connected to a database. The page asks `/api/items` for the menu; the routes answer with an empty list. On Tuesday you built the Corner Store database in Neon with `store.sql`. Tonight the API starts reading from it, using **Drizzle**, a library that lets TypeScript write SQL for you.

The bigger idea is where that database code lives. Every query goes in **one place** (a *service*), and the routes only ever call the service. When the store's rules change, you change one file.

This is the "before" state. Clone it, run it, and you get the app exactly as class starts.

## Before you start

You need the Corner Store database from Tuesday: a database called `store` in your Neon project, with `store.sql` run in it. If you skipped that, do it first (Neon → SQL Editor → pick `store` → paste the file → Run).

## How to run it

```
git clone https://github.com/patrickabernathy/mtc-ai-demos
cd mtc-ai-demos/week12/demo1
npm install
npm run dev
```

Open <http://localhost:3000>. You should see the header and **"The menu is empty."** That's correct for now: the page works, the API works, and nothing is connecting them to the database yet.

Only one project can hold port 3000, so stop any other `npm run dev` first. Keep that terminal where you can see it; when the API breaks, the explanation is printed there, not on the page.

## What's already here

| File | What it does |
|---|---|
| `app/page.tsx` | The menu page. It fetches `/api/items` and shows a card per item. **You won't change it tonight.** |
| `app/api/items/route.ts` | `GET` (the whole menu) answers `[]`. `POST` answers 501, "not built yet". |
| `app/api/items/[id]/route.ts` | `GET` (one item) always answers 404. `PATCH` answers 501. |
| `types/item.ts` | The shape the page expects for one item. |
| `.env.example` | The name of the one secret this app needs, with the value left blank. |

## What to do

### 1. Install Drizzle and the Neon driver

```
npm install drizzle-orm @neondatabase/serverless
```

`drizzle-orm` writes the SQL. `@neondatabase/serverless` is how it reaches Neon over the internet.

### 2. Put your connection string where git can't see it

Copy `.env.example` to a new file called `.env.local` (same folder). In Neon, open your project and click **Connect**. **Change the database dropdown to `store`** before you copy. Paste the string after `NEON_DATABASE_URL=`.

Run `git status`. `.env.local` should **not** be listed. If it is, stop and ask; that string is a password.

Restart `npm run dev` after creating or changing `.env.local`. Next only reads it when it starts.

### 3. Describe the tables in TypeScript

Make `drizzle/schema.ts` and describe the `categories` and `items` tables. Open `store.sql` from Tuesday next to it and copy the columns across one at a time. Each column looks like this:

```ts
name: text("name").notNull().unique(),
```

The word on the left is what your code calls it. The word in quotes is the column's real name in Postgres. So `is_available` in the database becomes `isAvailable: boolean("is_available")` in TypeScript.

### 4. Make `GET /api/items` read the database

Make the route connect, select every row from `items`, and return them. Open <http://localhost:3000/api/items> first and check you get rows. Then open the page, and answer these in order:

- Did the page crash? Look at `/api/items` again. Is `price` a number or text? Look for the quotes.
- What does Postgres send back for a `numeric` column, and why might it do that for money? Fix it in the schema, not in the page.
- The Gingerbread Latte is marked sold out. The owner says customers should never see it. Hide it from the list, then open <http://localhost:3000/api/items/8>. Can you still buy it?

### 5. Move every query into one place

If you answered the last question honestly, you found the problem tonight is about. Fix it so that:

- **one file** (`providers/neon.ts`) is the only place that reads `NEON_DATABASE_URL` and connects,
- **one file** (`services/itemService.ts`) is the only place that writes a query about items,
- and the route files import neither `drizzle-orm` nor the connection. They call the service and pick a status code.

You're done when the "never show sold-out items" rule is written **once** and both `/api/items` and `/api/items/8` obey it.

### 6. If you finish

- Build `POST /api/items` and `PATCH /api/items/[id]` (change the price) through the service. The checks on the body stay in the route, like week 11. The `insert` and `update` go in the service.
- Add `/api/categories/[id]/items`: every item in one category. Add a method to the service; the new route just calls it.

## The teaching point

The page doesn't know there's a database. The routes shouldn't either. Each layer knows one thing:

| Layer | Knows | Doesn't know |
|---|---|---|
| Page | the address `/api/items` | how the API gets its data |
| Route | HTTP: the request, the body, the status code | SQL, Drizzle, the connection |
| Service | how to ask the database about items, and the store's rules | HTTP, status codes |
| Provider | how to connect to Neon | anything about coffee |

Tuesday you moved "Snacks" into its own table so renaming it meant changing one row. This is the same move, for code: put each query in one place, so changing a rule means changing one file.

## The `states/` folder

The code at each checkpoint of the live demo. If your typing goes sideways, copy the matching file over yours and keep going. **Reference only:** Next builds what's under `app/`, so nothing in `states/` runs until you copy it in. The first line of each file says where it goes.

| State | What it shows |
|---|---|
| `01-schema-price-as-text` | The two tables in Drizzle, with `price` the way Postgres sends it: as text. The page crashes. |
| `02-query-in-the-route` | The list route connects and queries by itself. It works. |
| `03-schema-price-as-number` | `mode: "number"` fixes the crash. |
| `04-copied-to-one-item` | The one-item route, copied from the list route. Two files now connect and query. |
| `05-rule-in-one-route` | "Hide sold-out items" added to the list route only. `/api/items/8` still sells it. |
| `06-provider` | One file that connects, and checks the secret is really there. |
| `07-service` | One file that queries, with the sold-out rule written once. |
| `08-routes-call-the-service` | Both routes, now a few lines each. |
| `09-change-it-once` | A new rule (hide items with no description), one line in one file, both routes obey. |
