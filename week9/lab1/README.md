# lab1 — finish the Tailwind pass, then play with flex and positioning

Picks up where `demo1` leaves off in class: Tailwind is installed and turned
on, and the header, the menu grid, and the product cards are already restyled
with utility classes. The cart section and every button in the store are
still the old `globals.css` classes.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Finish converting the leftover CSS classes (`.add-btn`, `.cart`,
`.cart-list`, `.cart-item`, `.remove-btn`, `.cart-total`) to Tailwind
utilities, then use `flex` and `position` to lay the menu and cart out side
by side on a wide screen and pin a "New" badge to a product card. Full
step-by-step guide, with checkpoints and hints, in `instructions.html` (open
it in a browser).

## The teaching point

Layout utilities (`flex`, `grid`, `gap`, `items-`, `justify-`) go on the
parent, not the child — and `absolute` only means something relative to the
nearest ancestor that has `relative` on it. Both are decisions about the box
that holds the content, not the content itself.
