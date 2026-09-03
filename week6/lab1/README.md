# lab1 — give the bakery page state

Ridgeline Bakery, one file, same shape as `demo1`'s coffee cart: five pastries,
a cart, no interactivity. Every quantity says 1 forever and every button is
painted on.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Make every quantity control and every cart button actually work, using
`useState` — without adding a single component or a second file. Full
step-by-step guide, with checkpoints and hints, in `instructions.html`
(open it in a browser).

## The teaching point

Doing this once for Croissant is easy. Doing it for all five pastries means
five near-identical `useState` calls and five near-identical click handlers —
and that repetition is deliberate. It's the exact pain `lab2` exists to fix,
so feel it here first.
