# demo2 — the same cart, cut into components

Exactly the page from `demo1`, on screen identical, with the markup split into
five components: `Header`, `MenuList`, `MenuItem`, `CartList`, `CartItem`. The
menu and cart data moved out to `types/coffee.ts`, so the data lives in one
place instead of being typed out five times.

Nothing works yet, same as demo1. This step is only about where the code lives.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Read it first

Start at `app/page.tsx`. It is now nine lines and says nothing about coffee:

```tsx
<Header />
<main>
  <MenuList />
  <CartList />
</main>
```

Follow `MenuList` → `MenuItem`. The five drinks are no longer five blocks of
markup — there is **one** `MenuItem`, and `MenuList` runs it once per drink with
`.map()`. Change the price to bold in `MenuItem.tsx` and all five change.

A **prop** is the input to a component. `MenuItem` takes one:

```tsx
export function MenuItem({ item }: { item: MenuItemType }) {
```

`item` arrives from the parent. The component never goes looking for its own
data — it renders whatever it is handed, which is what makes it reusable.

## What to do

Wire it up, the way you did in demo1 — but notice you cannot do it the same way.

1. The cart has to be state, and it has to be state in `app/page.tsx`, not in
   `CartList`. **Two components need it** (the menu adds to it, the cart shows
   it), so it belongs to the closest parent of both. Add `"use client"` and
   `useState` there.
2. Write `handleAdd(item, qty)` and `handleRemove(name)` in `page.tsx`.
3. Pass them down: `<MenuList onAdd={handleAdd} />` and
   `<CartList cart={cart} onRemove={handleRemove} />`. Each component adds those
   to its props, and `MenuList` passes `onAdd` along to each `MenuItem`.
4. Give `MenuItem` its own `qty` state — that number belongs to one card and
   nobody else needs it, so it stays where it is used.
5. Have the buttons call the functions they were handed.

When you are done, compare with `demo3`. It is this exercise finished.

## The teaching point

Data goes **down** as props; events come **back up** as functions. `MenuItem`
does not know what happens when you add a drink. It calls `onAdd` and that is
the end of its responsibility — the parent decides what "adding" means.

That is the whole reason state moved up to `page.tsx`: whoever owns a piece of
state must sit above everyone who needs to see it.
