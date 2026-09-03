# lab2 — cut the bakery into components

This starter is `lab1`, already finished for you: every pastry works, the
cart works, nothing is broken. The exercise isn't making it work — it's
taking one working 260-line file and splitting it into five components
without changing what's on screen.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000. It should look and behave exactly like a
finished `lab1`.

## What to do

Build `Header`, `MenuItem`, `MenuList`, `CartItem`, and `CartList` in
`components/`, move the menu data into `types/coffee.ts`, and lift the cart
state up to `page.tsx` so it can be passed down as props. Full step-by-step
guide, with a suggested build order and checkpoints, in `instructions.html`.

## The teaching point

Data goes **down** as props; events come **back up** as functions. State
lives in the closest component that's a shared parent of everyone who needs
it — no higher, no lower. `MenuItem`'s own quantity stays local; the shared
cart moves up to `page.tsx`.
