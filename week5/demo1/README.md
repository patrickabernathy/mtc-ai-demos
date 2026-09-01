# Next.js demo — The Corner Store

A small React app, continuing the same Corner Store page from earlier weeks and
the same cart data from the TypeScript demos.

## First: install

Run this once in this folder, before anything else:

```
npm install
```

## Run it

```
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx`
and save — the page updates without a refresh.

`npm run build` produces a production build and also type-checks the whole
app; that's the command to run if you just want to confirm everything still
compiles.

## The starting point

`app/page.tsx` is the whole store page as one chunk of JSX — the same
header, address, and nav links from the plain-HTML version, just written in
React instead of `.html`. Nothing is broken into components yet.

## The states

`states/` holds later versions of the app as reference — not code Next runs
(Next only builds what's under `app/`), just checkpoints to compare against
or copy from if you get stuck.

- **`01-static/`** — same as the starting `app/page.tsx`.
- **`02-header/`** — the header pulled out into its own `Header` component.
  Nothing changes on screen; only where the markup lives changes.
- **`03-props/`** — a `CartRow` component that takes one cart item as a
  *prop* and renders it as a table row, wired in by hand for each item.
- **`04-composition/`** — a `CartList` component that takes the whole cart
  array and maps it to a `CartRow` per item. `page.tsx` now just arranges
  `Header` and `CartList` — it doesn't know what's inside either one.

Each state folder is self-contained: copy its files straight into `app/`
and it runs as-is, with one thing to fix by hand — the states are one folder
deeper than `app/`, so `../../types/cart` in a states file becomes
`../types/cart` once it's inside `app/`.

## The cart data

`types/cart.ts` has the `CartItem` type — `{ name, price, qty }` — and a
small sample cart. It's the same shape used in the TypeScript demos; this
app doesn't redefine it, it imports it.
