# Week 11, lab 1 — Happy Tails: a shelter API with a front door

One lab that builds on itself, covering everything from this week's lecture in one API-only Next 16 app. The Happy Tails animal shelter needs three kinds of access: **anyone** can browse the animals, **staff** with a token can add or change one, and the **manager** with a username and password can see the numbers.

The starting point has no routes except `/api/health`, and a ready-made list of pets in `types/pet.ts`, the same idea as the coffee `menu` from lecture. That array *is* the server's data, so every POST and PUT you write changes what the next GET sees.

**This is the `answers` branch: the finished lab.** It needs a `.env.local` next to `package.json` before the locked routes will open:

```
API_TOKEN=shelter-staff-2026
ADMIN_USER=admin
ADMIN_PASS=adopt-dont-shop
```

## How to run it

```
cd mtc-ai-demos/week11/lab1
npm install
npm run dev
```

It runs on <http://localhost:3000>, so stop any other `npm run dev` first. Send requests with the **Postman desktop app** (the web version can't reach `localhost`), and keep the terminal running `npm run dev` where you can see it.

Check it's alive: `GET http://localhost:3000/api/health` should answer **200** with `{"status":"ok"}`.

## What to do

**The full step-by-step guide is `instructions.pdf`** (also `instructions.html`, the same thing for a browser). Every step says what to build, when to test in Postman and exactly what you should see, what to ask your Claude if you're stuck, and links to that step's full code at the back.

The ten steps, each one building on the last:

| Step | You build | The idea |
|---|---|---|
| 1 | `GET /api/pets` | A public route: the folder is the address, the function name is the verb |
| 2 | `GET /api/pets/[id]` | A dynamic route, and a 404 you choose |
| 3 | `POST /api/pets` | Check every field before saving; 201 and 400s |
| 4 | `PUT /api/pets/[id]` | Replace a whole pet; PUT vs. PATCH |
| 5 | A Bearer token in `.env.local`, checked in POST | A private route, and a secret that stays on the server |
| 6 | `proxy.ts` that only logs | One file that runs before every request, and the one folder it works in |
| 7 | The token check moved into the proxy | One place decides who gets in, and then everything is locked |
| 8 | A list of public routes in the proxy | Deny by default: list what's open, lock the rest |
| 9 | Proper log lines | Timestamp, verb, address, decision, and never a secret |
| 10 | `GET /api/admin/summary` behind Basic auth | Decode the header, split it, compare it to `.env.local` |

## The finished version

| File | What it does |
|---|---|
| `app/api/pets/route.ts` | `GET` the list; `POST` a pet after checking name, species and age |
| `app/api/pets/[id]/route.ts` | `GET` one pet or a 404; `PUT` a whole pet, all four fields required |
| `app/api/admin/summary/route.ts` | `GET` total, adopted and waiting, worked out from the live list |
| `proxy.ts` | Public GETs straight through; `/api/admin` needs Basic auth; everything else needs the Bearer token; one log line per request |

The order of the checks in `proxy.ts` is the lesson: public first, then admin, then the token. Anything not on the public list is locked by default, so `GET /api/nope` is a 401, not a 404. The Basic auth check is done by hand:

```ts
const decoded = atob(auth.slice("Basic ".length)); // "YWRtaW46..." -> "admin:password"
const [user, pass] = decoded.split(":");

if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
  // 401, with WWW-Authenticate so a browser pops up its login box
}
```

The "Going further" list in the handout is left unsolved on purpose. Two of its items are real holes in this answer: an unset `API_TOKEN` makes `Bearer undefined` a valid token, and `Basic hello!` makes `atob` throw into a 500.

## The teaching point

`proxy.ts` runs before every route, so it's where checks that every route needs belong, written **once**. What it returns decides what happens next: `NextResponse.next()` carries on to the route, and a response of its own stops the request there.

Secrets (the staff token, the manager's password) live in `.env.local`, are read only on the server, and never appear in your code or your logs. The repo's `.gitignore` has a `.env*` line that keeps that file out of Git.

## Things that will bite you

- **`proxy.ts` only works in the top folder**, next to `package.json`. Anywhere else, nothing calls it and Next doesn't warn you.
- **`.env.local` goes in this folder too**, next to `package.json`. It isn't in the repo, on purpose. You make it in Step 5.
- **Saving a file can reset the list.** It lives in memory, so restarting or reloading puts it back to what `types/pet.ts` says.
- **Claude may say `middleware.ts`.** That's the Next 15 name. This is Next 16: `proxy.ts`, exporting a function called `proxy`.
- **The first `npm run dev` writes `AGENTS.md`.** It's notes from Next for AI coding tools. Leave it.
