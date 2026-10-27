# Week 14, demo 2 — Attack your own store

The Corner Store from Tuesday (`week14/demo1`), with every fix from Tuesday already in: you can only read your own receipts, only a manager can change a price, passwords are hashed, and logging out really ends the session.

Then a teammate added two "helpful" things, and tonight we attack them:

- **A search box** (`/search`) that builds its SQL by gluing your words into it.
- **Friendlier login errors** that say exactly what went wrong.

Both work fine for an honest person. Tonight's question is different: **what happens if somebody does this on purpose?**

**This is the `answers` branch: the finished version.** The steps under "What to do" are the exercise as it was set on `main`; "The finished version" below shows where it ends up.

## The finished version

| File | What changed |
|---|---|
| `services/itemService.ts` | `search` sends the words as a value (`` sql`...` `` without `.raw`). Every attack in step 1 now returns `[]` (`states/01-parameterized`) |
| `services/authService.ts` | `logIn` answers true or false, and no longer says *which* part was wrong (`states/02-quiet-errors`) |
| `app/api/login/route.ts` | Checks `email` and `password` are text, gives one message for every failure, and sends the real error to the terminal (`states/02-quiet-errors`) |
| `app/api/items/search/route.ts` | The same quiet `catch` (`states/02-quiet-errors`) |
| `app/api/items/route.ts` | `GET` answers with `Access-Control-Allow-Origin: http://localhost:5500`, so the test page can read the menu and other sites still can't (`states/03-cors-header`) |

The threat model (step 4) is yours to write about your own app, so there's no answer for it here.

## Before you start

You need Tuesday's setup in your Neon `store` database: `store.sql`, then `db/auth.sql`, then `db/hash.sql` (both are in this folder). Jennifer (`jennifer.rivera42@example.com`, password `latte4ever`) is a customer; Priya (`priya.raman@example.com`, password `manager123`) is a manager. The passwords are fake.

## How to run it

```
cd mtc-ai-demos/week14/demo2
npm install
```

Copy your `.env.local` from `week14/demo1` (or `week12/demo1`) into this folder. Then:

```
npm run dev
```

Open <http://localhost:3000/search>. Keep the terminal visible: the fixes send the real errors there.

## What to do

### 1. Break the search box

Search for `latte`. Then try each of these, exactly as written, and read what comes back:

| Type this | What you're testing |
|---|---|
| `'` | One apostrophe. What does the error tell you? |
| `' OR 1=1 --` | Is the Gingerbread Latte in the answer? It's sold out. |
| `' UNION SELECT id, email, 0 FROM users --` | Whose names are those? |
| `' UNION SELECT id, email \|\| ' ' \|\| password_hash, 0 FROM users WHERE password_hash IS NOT NULL --` | What did Tuesday's hashing save you from? |

(Type the last one with two plain `|` characters; the backslashes are only there so this table displays.)

**Fix it** in `services/itemService.ts`: in `search`, take away `.raw(` and its closing `)`, so the query is a plain `` sql`...` `` template, and pass the words in as a value with `${pattern}` (where `pattern` is `"%" + words + "%"`) instead of pasting them inside quotes. Run all four again. Every one should now come back as an empty list `[]`.

### 2. Make the login say less

On `/login`, try a made-up email, then Jennifer's email with the wrong password. Compare the two messages. Then, in Postman, `POST /api/login` with:

```json
{ "email": "jennifer.rivera42@example.com", "password": 12345 }
```

(The password is a number, not text.) Read everything that comes back.

**Fix it:** one message for every failed login (`"Wrong email or password"`), real details to the terminal with `console.error`, and check that `email` and `password` are text (`typeof ... === "string"`) before using them. Do the same quiet `catch` in the search route.

### 3. Another website asks for your menu (optional)

In a second terminal: `npx serve cors-test -l 5500` (say yes if it asks to install). Open <http://localhost:5500> and press the button. Then open the Console (F12). Compare with opening <http://localhost:3000/api/items> directly, or with `curl http://localhost:3000/api/items`.

**Fix it** in `app/api/items/route.ts`: answer `GET` with the header `Access-Control-Allow-Origin: http://localhost:5500`.

### 4. Write your threat model

Copy `threat-model-template.md` into your own project as `THREAT-MODEL.md` and fill it in for your own app. Thursday, a classmate reviews it.

## The teaching point

**Never build a query by gluing text together.** The moment someone else's words are pasted into your SQL, they can write SQL too. The fix is one word: `` sql`...` `` without `.raw` sends the words *separately*, as a value, and Postgres never reads them as code.

```ts
// Glued: their words become part of the query.
sql.raw(`... name ILIKE '%${words}%'`)

// Separate: their words travel as a value ($1). A quote is just a quote.
sql`... name ILIKE ${pattern}`
```

Drizzle's normal query builder (`db.select().from(items).where(...)`) already does this for you. The danger is the day you step outside it.

**An error message is for you, not for them.** The full error, the query, the file names: those go to the terminal. The person on the other end gets one sentence. And a login form that says "no such email" for one and "wrong password" for another has just told a stranger who has an account.

**CORS is the browser's rule, not the server's.** The request from port 5500 reached the server and the server answered (look at the terminal: `200`). The *browser* refused to hand the answer to a page from a different address. `curl` and Postman don't follow that rule at all, which is why the same request works there.

## The `states/` folder

Reference only: Next builds only what's under `app/`, so these files do nothing until you copy them over the real ones.

| State | Copy to | What it shows |
|---|---|---|
| `01-parameterized/itemService.ts` | `services/itemService.ts` | `search` with the words sent as a value. Every attack in step 1 returns `[]` |
| `02-quiet-errors/authService.ts` | `services/authService.ts` | `logIn` back to giving one answer, true or false |
| `02-quiet-errors/login-route.ts` | `app/api/login/route.ts` | Type checks, one failure message, details to the terminal |
| `02-quiet-errors/search-route.ts` | `app/api/items/search/route.ts` | The same quiet `catch` |
| `03-cors-header/items-route.ts` | `app/api/items/route.ts` | The menu readable by a page on `localhost:5500`, and no one else |
