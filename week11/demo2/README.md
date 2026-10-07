# Week 11, demo 2 — The same endpoints in Express

Two of demo 1's endpoints — the list and one drink — rebuilt in **Express**, outside Next, from an empty folder. Express is the small server program most job postings mean by "a Node back end." The point isn't to switch to it. It's to see what Next was doing for you, by doing it by hand.

This folder starts empty on purpose: the demo builds it from nothing, so the install is part of the lesson.

## How to run it

```
cd mtc-ai-demos/week11/demo2
npm init -y
npm install express
```

Make `server.js` (see below), then:

```
node server.js
```

It listens on <http://localhost:4000>, so it can run next to a Next app on 3000. Send requests from the Postman desktop app. **Express doesn't reload when you save** — stop it with `Ctrl`+`C` and run `node server.js` again after every change.

If you see `EADDRINUSE`, something else is already using port 4000. Change the number in `server.js` and in your requests.

## What `npm install` just did

Three things appear:

| | What it is | Commit it? |
|---|---|---|
| `package.json` | The project's description. `npm install` added `express` to its `dependencies`. | Yes |
| `node_modules/` | Express plus the 60-odd packages it depends on. | No — `npm install` rebuilds it |
| `package-lock.json` | The exact version of every one of those packages, so everyone gets the identical set. | Yes |

## What to do

### 1. Two endpoints

In `server.js`:

```js
const express = require("express");
const app = express();
const menu = [{ id: 1, name: "Espresso", price: 2.5 }, { id: 2, name: "Latte", price: 4 }];
```

Then add `app.get("/api/menu", ...)` that sends the menu with `res.json(menu)`, and `app.get("/api/menu/:id", ...)` that finds one drink by `req.params.id` and answers `res.status(404).json({ error: "..." })` if it's missing. Finish with `app.listen(4000, ...)`.

### 2. A logger, in the wrong place

Add this **below** your two routes, above `app.listen`:

```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

Restart, send `GET /api/menu`, and watch the terminal. Then send `DELETE /api/menu`. Which one gets logged, and why? Move the logger so that every request is logged.

### 3. A POST

Add `app.post("/api/menu", ...)` that reads `req.body.name`. Send it a JSON body. What happens, and what's missing from the line-up at the top of the file?

## The teaching point

Express runs your `app.use` and `app.get` lines **in the order they appear in the file**, and a route that answers doesn't pass the request on. So a logger below the routes only ever sees the requests nobody answered, and a body reader below a route is too late for it. "Middleware order" is the name for this, and it's a bug a Next route file can't have.

| | Next route handler | Express |
|---|---|---|
| The address | the folder path | a string: `"/api/menu/:id"` |
| The verb | the function's name: `GET` | the method: `app.get` |
| Starting it | `npm run dev` | `app.listen(4000)` + `node server.js` |
| Wrong verb | 405 | 404, "Cannot DELETE" |
| Reading the body | `await request.json()` in the route | `app.use(express.json())`, before the routes |

## The `states/` folder

Each step of `server.js`, frozen. Copy one over your `server.js` to catch up.

| State | What it shows |
|---|---|
| `01-two-endpoints` | The list and one drink, listening on 4000 |
| `02-logger-below` | The logger below the routes: GET prints nothing |
| `03-logger-above` | Moved up: every request is logged |
| `04-post-no-parser` | POST crashes — `req.body` is undefined |
| `05-with-json` | `express.json()` in the line-up, before the routes |
