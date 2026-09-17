# lab1 — give the shop more than one page

Backspin Records, a used record store, on one page and nothing else: a list
of six albums, a header with a clock, no nav, nowhere else to go.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Build an About page, a small nested Help Center (two pages under one shared
wrapper), and a working nav — starting with plain `<a>` tags so you can watch
the clock reset, then swapping to `<Link>` so it doesn't. Full step-by-step
guide, with checkpoints and hints, in `instructions.html` (open it in a
browser).

## The teaching point

The `app/` folder is the routing table, not a list you maintain by hand — a
folder with a `page.tsx` in it is a page, and a `layout.tsx` wraps only the
folder it lives in and everything below it. A plain `<a>` and a `<Link>` end
up on the same page, but only one of them keeps the rest of the app alive to
get there.
