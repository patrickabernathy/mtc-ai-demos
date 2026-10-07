# Week 11, demo 2 — A Next app that's only an API

A second Next.js app with **no pages at all**. There's no `page.tsx` and no `layout.tsx`, just two route files under `app/api/`. Next is a perfectly good server on its own: the same API could sit behind a phone app, another company's website, or your store.

It has demo 1's two endpoints, the list and one drink, already written. The new thing is **`proxy.ts`**: one file whose function runs *before* every request reaches a route.

This app is on **Next 16**, a newer version than the Corner Store (Next 15). `proxy.ts` is the Next 16 name. If you ever see `middleware.ts` in an older project or tutorial, it's the same idea under its old name.

**This is the `answers` branch.** `proxy.ts` is finished and sits in the top folder, next to `package.json`: it logs every request with `proxy saw:` and turns away anything without the right `x-auth` header. Make `.env.local` (step 3 below) before you run it, or every request gets a 401.

## How to run it

```
cd mtc-ai-demos/week11/demo2
npm install
npm run dev
```

It runs on <http://localhost:3000>, so stop the Corner Store's `npm run dev` first. Send requests with the **Postman desktop app**, and keep the terminal running `npm run dev` where you can see it. Everything in this demo shows up there.

The first `npm run dev` writes a file called `AGENTS.md`. It's notes from Next for AI coding tools, telling them this is Next 16. Leave it.

## What `npm install` just did

| | What it is | Commit it? |
|---|---|---|
| `package.json` | The project's description, including its `dependencies`: `next`, `react`, `react-dom`. | Yes |
| `node_modules/` | Those three plus every package *they* depend on. Hundreds of folders. | No — `npm install` rebuilds it |
| `package-lock.json` | The exact version of every one of those packages, so everyone gets the identical set. | Yes |

## What to do

### 1. The two endpoints, and no pages

Send `GET http://localhost:3000/api/menu` and `GET http://localhost:3000/api/menu/2` from Postman. Then open <http://localhost:3000> in a browser. What comes back, and why is that fine?

### 2. Log every request

Next already prints a line for each request. Write your own one: a function that prints `proxy saw:` plus the verb and the address, before the route runs.

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy saw:", request.method, request.nextUrl.pathname);
  return NextResponse.next();
}
```

Save it as `proxy.ts` **inside `app/`**, next to `api/`. Send `GET /api/menu` and read the terminal. Is there a `proxy saw:` line? Is there any error? Then work out where the file has to go for Next to call it.

Once it's logging, send a `DELETE /api/menu` (nobody answers DELETE, so it's a 405) and a `GET /api/nope` (a 404). Does the proxy see those too?

### 3. A gate in front of every route

Make `.env.local` in this folder:

```
MENU_KEY=mtc-fall-2026
```

Change the proxy so that a request whose `x-auth` header doesn't match `process.env.MENU_KEY` gets a **401** with `{"error": "..."}`, and every other request carries on. Then try it from Postman with no header, the right key, and a wrong key.

## The teaching point

`proxy.ts` runs before the route, for every request, so it's the place for things *every* route needs: writing down what came in, checking who's asking. Two things to remember:

- **It only works in one place**: the project's top folder, next to `package.json` and `app/`. Anywhere else it's an ordinary file that nothing calls, and Next doesn't warn you.
- **What it returns decides what happens next.** `NextResponse.next()` means "carry on to the route." Returning a response of its own means "stop here," and the route never runs.

## The `states/` folder

Each step, frozen. **Reference only** — Next builds only what is under `app/` and the top-level `proxy.ts`, so nothing in here runs where it sits. The first line of each file says where it goes.

| State | What it shows |
|---|---|
| `01-proxy-in-app` | The logger in `app/proxy.ts`: no `proxy saw:` line, no error |
| `02-proxy-at-root` | The same file in the top folder: every request logged |
| `03-proxy-gate` | A 401 for a missing or wrong `x-auth`; needs `.env.local` |

`states/` is excluded from type-checking in `tsconfig.json`.

## Things that will bite you

- **Next prints its own line for every request** (`GET /api/menu 200 in 6ms`). That isn't your proxy. Look for `proxy saw:`. Once the proxy is running, Next's line also gets a `proxy.ts:` timing in it.
- **Port 3000 taken?** Next picks 3001 and says so in the terminal. Use whatever it says.
- **`.env.local` changes are picked up without a restart.** The terminal prints `Reload env: .env.local`.
