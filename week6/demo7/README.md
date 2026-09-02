# demo7 — the menu comes from a server

Same coffee cart. One change: the menu is not in a file on your computer any
more. The page has to go and ask for it, and that turns out to change almost
everything about how the page has to behave.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Where the menu comes from

```
https://n8n.aseglave.net/webhook/mtc-menu
```

Open that URL in a browser tab. You get the menu as JSON — that is all a
"server" is here: a URL that hands back data instead of a page.

You can ask it for a bad day on purpose:

| Add this to the URL | What you get |
|---|---|
| *(nothing)* | The five drinks, after about a second |
| `?delay=4000` | The same five drinks, four seconds later |
| `?state=empty` | A successful reply with an empty list in it |
| `?state=error` | A 500 — the server admitting it broke |
| `?status=404` | **Any status code you like** — 401, 404, 429, 503, even 418 |

That last one is the useful one. You cannot build a page that handles a 404
properly by waiting for a real 404 to turn up; you have to be able to summon
one. Each forced failure comes back with a sentence in it, so there is
something real to display:

```
GET /webhook/mtc-menu?status=503
{ "error": "We are closed for maintenance.", "status": 503 }
```

**If the server is unreachable** — no wifi, or it is having a bad night —
change `MENU_URL` in `app/page.tsx` to `"/api/menu"`. There is a copy running
on your own machine at `app/api/menu/route.ts`, and it answers every one of
those the same way.

## The four situations

Once data comes from somewhere else, "the menu" is no longer one thing. It is
four, and a page that only handles the first one is broken three ways:

1. **Waiting** — we asked, nobody has answered yet.
2. **Arrived, and it is empty** — a perfectly good answer that happens to
   contain nothing. Nothing is wrong.
3. **Arrived, and here it is** — the happy path, the only one most examples
   bother with.
4. **It failed** — we asked and did not get a usable answer. Something *is*
   wrong, and it is not the customer's fault.

The bug worth remembering: 1 and 2 look identical unless you make them
different. A store with fifty products spends its first second telling
customers it has nothing.

## What to do

`app/page.tsx` still reads the menu out of `types/coffee.ts`. Replace it with
the real thing, one situation at a time.

1. Make `menu` state that starts as an empty array, and load it in a
   `useEffect` that runs once (`[]` as the second argument) — `fetch`, then
   `res.json()`, then `setMenu`. Delete the hard-coded import.
2. Watch the first second closely with `?delay=4000` on the URL. The page says
   the cart is out of coffee. Add a `loading` state so it can say it is waiting.
3. Try `?state=empty`. "Waiting" and "we have nothing" are two different
   sentences and the page has to be able to say both.
4. Try `?state=error`. Nothing happens — that is the surprise below. Check
   `res.ok` yourself, `throw` when it is false, catch it into an `error` state,
   and show that sentence with a **Try again** button that calls the same
   loading function.
5. Try `?status=404`, `?status=503`, `?status=418`. Your error message should
   change with each one without you touching the code again.

## The states folder

`states/` holds the page at each point we got to in class. It is reference, not
code Next runs — Next only builds what is under `app/`. Copy one over your own
`app/page.tsx` if you get stuck or want to see where it was going.

| State | What it shows |
|---|---|
| `01-fetch-no-guard` | The fetch works, and the page lies for one second |
| `02-loading` | A `loading` flag, so the page says it is waiting |
| `03-empty-vs-loading` | "Waiting" and "empty" finally say different things |
| `04-error-and-retry` | `res.ok`, a real error message, and a Try again button |
| `05-force-any-state` | A row of buttons that forces each situation on demand |

Where a state includes `MenuList.tsx` as well, both files changed together —
copy both.

## The one that surprises everybody

`fetch` does not throw when the server says 404 or 500.

From `fetch`'s point of view the trip succeeded: it asked, and it got an
answer. That the answer was "no" is not its problem. So a `try/catch` around a
`fetch` catches a *dead network*, not a *bad reply* — and the failure shows up
later, somewhere else, usually as a crash while reading data that was never
there.

Checking `res.ok` yourself is the fix, and it is not optional:

```ts
if (!res.ok) {
  throw new Error("The server said " + res.status + ".");
}
```
