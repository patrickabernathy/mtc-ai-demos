# lab2 — give the Button variants

Starts from where `demo1`'s Button extraction step lands: one `Button`
component, one look (green), used in four places — including the cart's
Remove button, which shouldn't look like a primary action but currently
does.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Give `Button` a `colour` prop and a `size` prop, each backed by a lookup
object of complete class strings — not a template literal built from the
prop, which Tailwind can't see through. Use the result to make Remove read
as a small, red, secondary action. Full step-by-step guide, with checkpoints
and hints, in `instructions.html` (open it in a browser).

## The teaching point

Tailwind scans your source files as plain text at build time — it never
runs your code. `` `bg-${colour}-600` `` never appears anywhere as the
literal string `bg-green-600`, so Tailwind never generates a rule for it. A
lookup object where every value is a complete class string, chosen by a
prop instead of built from one, is what makes a variant prop actually work.
