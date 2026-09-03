# lab2 — cut the bakery into components (answer)

The finished version of the `main` branch exercise: the same working
`lab1` page, split into five components with the cart state lifted to
`page.tsx` and passed down as props.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000. Behaves exactly like a finished `lab1` —
nothing changed on screen, only where the code lives.

## What this shows

`Header`, `MenuItem`, `MenuList`, `CartItem`, `CartList` in `components/`,
the menu moved to `types/coffee.ts`, and `page.tsx` reduced to state plus
two handler functions passed down as props. `MenuItem` keeps its own local
quantity state; only the cart — shared by two components — moved up.
Compare `instructions.html` for the guided version of this same exercise.

## The teaching point

Data goes **down** as props; events come **back up** as functions. State
lives in the closest component that's a shared parent of everyone who needs
it — no higher, no lower. `MenuItem`'s own quantity stays local; the shared
cart moves up to `page.tsx`.
