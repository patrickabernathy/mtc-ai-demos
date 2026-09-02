# demo3 — the cart that actually works

`demo2` with the wiring finished. Same components, same layout, but the cart is
now real state in `app/page.tsx` and every button does what it says.

If you worked the demo2 exercise, this is the answer to compare against.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000. Add a few drinks, add the same drink twice,
remove one, watch the total.

## What to do

Nothing to build — read it, then break it on purpose.

Trace one click all the way through before you change anything. Click `+` on
Latte and follow it:

`MenuItem` owns `qty` → you click **Add to cart** → it calls `onAdd(item, qty)`,
which came from `MenuList`, which got it from `page.tsx` → `handleAdd` runs
`setCart(...)` → React repaints, and `CartList` — which never heard about the
click — shows the new line.

Then try these, in order of difficulty:

1. Show a quantity control on each cart line so you can change the count after
   adding it.
2. Add a **Clear cart** button. Where does it have to live, and why can't
   `CartList` do it alone?
3. Put an item count in the `Header` ("3 drinks"). `Header` doesn't take props
   yet — you'll have to give it one, and pass the number from `page.tsx`.
4. Break it deliberately: in `handleAdd`, replace the state update with
   `cart.push({...})`. The array really does change. The screen doesn't. That
   is the single most common React bug there is.

## The teaching point

**Never edit state in place; always hand back a new value.**

```tsx
setCart((prev) => prev.filter((line) => line.name !== name));
```

`.filter()` returns a *new* array, so React sees a different value and repaints.
`.push()` changes the array React is already holding — same array, so as far as
React is concerned nothing happened. Same for objects: `{ ...line, qty: line.qty + qty }`
makes a copy with one field changed rather than editing the original.

The other thing to notice: `qty` on a menu card lives in `MenuItem`, but `cart`
lives in `page.tsx`. State goes as low as it can and no lower — down where only
one component cares, up to the nearest shared parent when more than one does.
