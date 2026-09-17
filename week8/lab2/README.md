# lab2 — give a record its own page

Starts from `lab1`, finished: the catalog, About, and Help Center all work,
and every record title in the catalog is already a link — to a page that
doesn't exist yet. Click one and you'll land on Next's default 404.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Build `app/records/[id]/page.tsx` so those links go somewhere: one dynamic
page for all six records, guarded against a bad or non-numeric id. Bonus
points for replacing the local lookup with a real fetch to the class API
(bearer-token, id in the query string); extra bonus for a search box whose
term lives in the URL's own query string — and extra-extra for having that
search hit the live API instead of filtering locally. Full step-by-step
guide, with checkpoints and hints, in `instructions.html`.

## The teaching point

A value that arrives from the address bar — whether it's a route segment
like `[id]` or a query-string parameter like `?q=` — is always text, never
the type it looks like. Converting it once, right where it comes in, is what
turns "crashes on real data" into "handles a bad address on purpose."
