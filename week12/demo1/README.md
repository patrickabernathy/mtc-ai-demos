# Week 12, demo 1 — The store talks to its database

A small Corner Store app with **the page already built and the API already scaffolded**, but nothing connected to a database. The page asks `/api/items` for the menu; the routes answer with an empty list. On Tuesday you built the Corner Store database in Neon with `store.sql`. Tonight the API starts reading from it, using **Drizzle**, a library that lets TypeScript write SQL for you, and **drizzle-kit**, its command-line tool, which reads your database and writes the TypeScript description of it for you.

The bigger idea is where that database code lives. Every query goes in **one place** (a *service*), and the routes only ever call the service. When the store's rules change, you change one file.

**This is the `answers` branch: the finished version.** The steps under "What to do" are the exercise as it was set on `main`; "The finished version" below shows where it ends up. To run it you still need your own `.env.local` (step 2) and `npm install`.

## The finished version

| File | What it does |
|---|---|
| `drizzle.config.ts` | Tells drizzle-kit where the schema lives and loads `.env.local` with dotenv. `npm run db:pull` uses it. |
| `drizzle/schema.ts` | All ten tables, written by `npm run db:pull`, with one edit: `items.price` uses `mode: "number"`. `relations.ts`, the `0000_*.sql` file and `meta/` came from the same pull. |
| `providers/neon/neonDatabaseProvider.ts` | `NeonDatabaseProvider`. The only file that reads `NEON_DATABASE_URL` and connects. If the secret is missing it throws a sentence that says so. |
| `services/itemService.ts` | `ItemService`. Every query about items: `getAll`, `getById`, `getByCategory`, `create`, `updatePrice`, `retire`. The sold-out rule (`onSale`) is written once at the top. |
| `app/api/items/route.ts` | `GET` the menu, `POST` a new item (checks the body, then calls `create`). |
| `app/api/items/[id]/route.ts` | `GET` one item, `PATCH` its price, `DELETE` it. |
| `app/api/categories/[id]/items/route.ts` | `GET` every item in one category. |

Things worth trying in Postman once it runs:

- `GET /api/items/8`: the Gingerbread Latte is sold out, so it's a **404**, the same as the list hiding it.
- `POST /api/items` with `{"name": "Latte", "price": 4, "categoryId": 1}`: there's already a Latte, and Tuesday made `name` unique. Read the terminal.
- `DELETE /api/items/3`: Tuesday showed Postgres refusing to delete an item that's on old receipts. So `retire` doesn't delete; it marks the item unavailable and the receipts keep their history. Ask for `/api/items/3` afterwards.
- To put everything back the way it started, run `store.sql` again in Neon.

The routes never import `drizzle-orm`, the schema, or the provider. Only the service does. That rule is what makes "change it in one place" true.

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

### 1. Install Drizzle, drizzle-kit, and the Neon driver

```
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit dotenv
```

- `drizzle-orm` is the part your app uses: it turns TypeScript like `db.select().from(items)` into SQL.
- `@neondatabase/serverless` is the driver: how the SQL actually reaches Neon over the internet.
- `drizzle-kit` is the command-line half of Drizzle. Tonight it reads your database and writes the schema file for you.
- `dotenv` lets `drizzle-kit` read `.env.local`. (Next reads that file by itself; `drizzle-kit` doesn't.)

`-D` means "only needed while developing," so those two go under `devDependencies` in `package.json`.

### 2. Put your connection string where git can't see it

Copy `.env.example` to a new file called `.env.local` (same folder). Make it in VS Code, not Notepad, so it doesn't secretly become `.env.local.txt`. In Neon, open your project and click **Connect**. **Change the database dropdown to `store`** before you copy. Paste the string after `NEON_DATABASE_URL=`.

Run `git status`. `.env.local` should **not** be listed. If it is, stop and ask; that string is a password.

Restart `npm run dev` after creating or changing `.env.local`. Next only reads it when it starts.

### 3. Tell drizzle-kit where things are: `drizzle.config.ts`

Make `drizzle.config.ts` next to `package.json`:

```ts
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",             // which kind of database
  schema: "./drizzle/schema.ts",     // where our tables are described
  out: "./drizzle",                  // where drizzle-kit writes what it generates
  dbCredentials: { url: process.env.NEON_DATABASE_URL || "" },
});
```

Then add one line to the `"scripts"` in `package.json`, so you don't have to remember the command:

```json
"db:pull": "drizzle-kit pull"
```

### 4. Pull: let drizzle-kit write the schema

```
npm run db:pull
```

`drizzle-kit` connects to your database, reads every table, column, key and rule that `store.sql` made on Tuesday, and writes them out as TypeScript. You should see `10 tables fetched`, and a new `drizzle/` folder:

| File | What it is |
|---|---|
| `drizzle/schema.ts` | **The one you use.** Every table, described in TypeScript. |
| `drizzle/relations.ts` | Which tables point at which. Not needed tonight. |
| `drizzle/0000_<random words>.sql` | The SQL that would rebuild these tables, commented out. Your file's name will be different. |
| `drizzle/meta/` | drizzle-kit's own notes. Leave it alone. |

Open `drizzle/schema.ts` next to `store.sql` and find `items`. Every line matches something you wrote on Tuesday. The name on the left of each line is what your code calls the column (`isAvailable`); the one in quotes is its real name in Postgres (`is_available`).

**Saw `1 tables fetched`, or `0`?** Your string points at the wrong database (`neondb` instead of `store`). Delete the whole `drizzle/` folder, fix the end of the string in `.env.local`, and pull again.

### 5. Make the Neon provider

Make `providers/neon/neonDatabaseProvider.ts`. This is the **only** file in the app that reads `NEON_DATABASE_URL` and connects. Everything else asks it for the connection. Copy it from `states/03-neon-provider/` and read the comments; it's short.

### 6. Make `GET /api/items` read the database

Make the route ask the provider for the connection, select every row from `items`, and return them:

```ts
const db = NeonDatabaseProvider.getInstance().getDb();
const rows = await db.select().from(items).orderBy(items.id);
```

Open <http://localhost:3000/api/items> first and check you get rows. Then open the page, and answer these in order:

- Did the page crash? Look at `/api/items` again. Is `price` a number or text? Look for the quotes.
- What does Postgres send back for a `numeric` column, and why might it do that for money? Fix it in `drizzle/schema.ts`, not in the page. (Pulling again would undo your fix, so from now on the file is yours.)
- The Gingerbread Latte is marked sold out. The owner says customers should never see it. Hide it from the list, then open <http://localhost:3000/api/items/8>. Can you still buy it?

### 7. Move every query into one place

If you answered the last question honestly, you found the problem tonight is about. Fix it so that:

- **one file** (`providers/neon/neonDatabaseProvider.ts`) is the only place that connects,
- **one file** (`services/itemService.ts`) is the only place that writes a query about items,
- and the route files import neither `drizzle-orm` nor the schema. They call the service and pick a status code.

You're done when the "never show sold-out items" rule is written **once** and both `/api/items` and `/api/items/8` obey it.

### 8. If you finish

- Build `POST /api/items` and `PATCH /api/items/[id]` (change the price) through the service. The checks on the body stay in the route, like week 11. The `insert` and `update` go in the service.
- Add `/api/categories/[id]/items`: every item in one category. Add a method to the service; the new route just calls it.

## The teaching point

The page doesn't know there's a database. The routes shouldn't either. Each layer knows one thing:

| Layer | Knows | Doesn't know |
|---|---|---|
| Page | the address `/api/items` | how the API gets its data |
| Route | HTTP: the request, the body, the status code | SQL, Drizzle, the schema |
| Service | how to ask the database about items, and the store's rules | HTTP, status codes |
| Provider | how to connect to Neon | anything about coffee |

On Tuesday, renaming Five Points on every spreadsheet row missed "5 Points" and "Five Pts", and nothing complained. The fix was to keep the shop's name in one row of `locations`, so renaming it means changing one row. This is the same move, for code: put each query in one place, so changing a rule means changing one file.

## The `states/` folder

The code at each checkpoint of the live demo. If your typing goes sideways, copy the matching file over yours and keep going. **Reference only:** Next builds what's under `app/`, so nothing in `states/` runs until you copy it in. The first line of each file says where it goes.

| State | What it shows |
|---|---|
| `01-drizzle-config` | `drizzle.config.ts`: where the schema goes, and how drizzle-kit finds your connection string. |
| `02-pulled-schema` | Exactly what `npm run db:pull` writes from the store. If your pull won't run, copy this in. |
| `03-neon-provider` | The one file that connects, and checks the secret is really there. |
| `04-query-in-the-route` | The list route gets the connection from the provider and writes its own query. It works. |
| `05-price-as-number` | The pulled schema with one edit, `mode: "number"` on `price`, which fixes the crash. |
| `06-copied-to-one-item` | The one-item route, copied from the list route. Two routes now write queries. |
| `07-rule-in-one-route` | "Hide sold-out items" added to the list route only. `/api/items/8` still sells it. |
| `08-service` | One file that queries, with the sold-out rule written once. |
| `09-routes-call-the-service` | Both routes, now a few lines each. |
| `10-change-it-once` | A new rule (hide items with no description), one line in one file, both routes obey. |
