# Week 11, demo 1 — Your store answers back

The Corner Store from week 9 (plain CSS), with **no `app/api/` folder yet**. Tonight it stops only *asking* other servers for data and starts *answering* requests itself: a list, one drink, adding a drink that gets checked first, and a secret that stays on the server.

This is the "before" state. Clone it, run it, and you get the store exactly as class starts.

## How to run it

```
git clone https://github.com/patrickabernathy/mtc-ai-demos
cd mtc-ai-demos/week11/demo1
npm install
npm run dev
```

The store is at <http://localhost:3000>. Send requests with the **Postman desktop app** — the web version of Postman runs on Postman's computers and can't reach `localhost`. Only one project can hold port 3000, so stop any other `npm run dev` first.

**Keep the terminal running `npm run dev` where you can see it.** When an endpoint goes wrong, Postman often shows an empty body; the explanation is printed in that terminal.

## What to do

### 1. The list

Make `app/api/menu/route.ts`. A file called `route.ts` sends data instead of a page, and its folder is its address: this one answers at `/api/menu`.

Export one function that returns the menu with `Response.json(menu)`. Import `menu` from `types/coffee.ts` (three `../` from that folder).

Name the function `handler` first and send `GET http://localhost:3000/api/menu` from Postman. **Read the status, then read the terminal.** Then work out what the function has to be called.

### 2. One drink

Make `app/api/menu/[id]/route.ts`. Square brackets mean "any value goes here", exactly like week 8's drink pages. In a route there is no `useParams`; Next passes the values to your function as its second input:

```ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // id is text: "2", not 2
}
```

Look the drink up and return it. `/api/menu/2` should give the Latte. Then ask for `/api/menu/99` and read the status. Is that the right code? Whose fault is a drink that doesn't exist? Make it say so.

### 3. Add a drink

Add a `POST` function to `app/api/menu/route.ts`. Read the body with `await request.json()`, push a new drink onto the list, and answer **201**.

Then try to break it from Postman:

- send `{}`
- send `{"name": "Tea", "price": "banana"}`
- switch the body dropdown from JSON to **Text** and send the word `banana`

Each of those should be a **400** with a body like `{"error": "name is required"}`. Every error your API sends should have that same shape.

Now stop the server (`Ctrl`+`C`) and start it again. Where did your new drinks go?

### 4. A secret only the server can see

Before anything else: open `.gitignore` at the top of the repo and find the line that keeps `.env` files out of Git. Check your own project has one too.

Make `.env.local` in this folder (next to `package.json`):

```
MENU_KEY=mtc-fall-2026
```

Make `app/api/locked-menu/route.ts` that fetches `https://n8n.aseglave.net/webhook/mtc-menu-auth` with the header `x-auth` set to `process.env.MENU_KEY`, and returns what comes back. `GET /api/locked-menu` should give you the menu.

Then try reading `process.env.MENU_KEY` from `app/page.tsx` (it starts with `"use client"`, so it runs in the browser). What prints in the browser console? What happens if you rename the variable to start with `NEXT_PUBLIC_` — and can you find the key in DevTools → Sources with `Ctrl`+`Shift`+`F`? Put it back afterwards.

### 5. Change one, remove one

In `app/api/menu/[id]/route.ts`, add `DELETE` (remove the drink, answer **204** with no body) and `PATCH` (change only the fields you were sent, with the same checks as POST).

## The teaching point

```ts
export async function GET() { ... }    // the folder is the address, the name is the verb
return Response.json({ error: "..." }, { status: 404 });   // nothing picks the code for you
```

A route answers a verb only if a function with that exact name is exported. Anything else is a 405. And `Response.json` always says 200 unless you tell it otherwise, so every 201, 400 and 404 in your API exists because you wrote it.

Secrets go in `.env.local`, are read only inside a route, and never get the `NEXT_PUBLIC_` prefix — that prefix means "paste this into the page's code."

## The `states/` folder

Each step, frozen. **Reference only** — Next builds only what is under `app/`, so nothing in here runs where it sits. The first line of each file says where it goes; copy it over your own to catch up or compare.

| State | What it shows |
|---|---|
| `01-handler` | Right file, right code, wrong name: 405 |
| `02-get` | The same function named `GET` |
| `03-one-drink-crash` | A missing drink crashes into a 500 |
| `04-one-drink-404` | A 404 you chose, with a message |
| `05-post-trusting` | POST that saves whatever it's sent |
| `06-post-rules` | Bad JSON and bad fields are 400s; one error shape |
| `07-locked-menu` | The key read on the server from `.env.local` |
| `08-delete-patch` | One drink: read, change, remove |

`states/` is excluded from type-checking in `tsconfig.json`, because some of them are deliberately broken and are supposed to stay that way.

## Things that will bite you

- **Saving a route file resets the list.** While `npm run dev` runs, saving reloads the route, and the menu goes back to what the code says. That's not a bug in your POST. The list lives in memory; next week it moves into a database.
- **Drinks you add with POST don't appear on the store's page.** The page uses its own copy of the list in the browser. Postman's GET shows the server's copy.
- **A price in quotes is text.** `"price": "4.25"` fails the number check. `"price": 4.25` passes.
