# lab1 — give the bakery page state (answer)

The finished version of the `main` branch exercise. Every quantity control
and every cart button works, all of it wired with `useState` in one file —
no components yet.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000. Change quantities, add pastries, remove
them, watch the total.

## What this shows

Five nearly-identical `useState` calls, one per pastry, plus a `cart` state
array with `addToCart`/`removeFromCart` functions that always hand `setCart`
a new array instead of mutating the old one. Compare `instructions.html` for
the guided version of this same exercise.

## The teaching point

Doing this once for Croissant is easy. Doing it for all five pastries means
five near-identical `useState` calls and five near-identical click handlers —
and that repetition is deliberate. It's the exact pain `lab2` exists to fix,
so feel it here first.
