# demo1 — the whole coffee cart in one file

The Daily Grind, written the way you would write it on your very first night:
one file, no components, nothing shared. `app/page.tsx` holds the types, the
menu, the cart, and every line of markup — five drinks, typed out five times.

Nothing on the page does anything yet. The `+` and `-` buttons are painted on.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Make the page work, without adding a single component. Everything stays in
`app/page.tsx`.

1. Put `"use client"` on the first line of the file. Buttons that react to
   clicks need it — the page has to run in the browser, not just on the server.
2. Import `useState` from React.
3. Give **Espresso** a quantity that changes: a piece of state starting at `1`,
   shown in place of the hard-coded `1` in its `<span className="qty">`, with
   the `+` and `-` buttons wired to change it. Don't let it go below 1.
4. Make Espresso's **Add to cart** button put that many espressos in the cart.
   That means `cart` can no longer be a `const` at the top of the file — it has
   to be state too, or the screen will never notice it changed.
5. Make the **Remove** buttons take a line back out of the cart.
6. Now do the other four drinks.

You'll know it works when the total at the bottom keeps up with you.

## The teaching point

Step 6 is the real lesson, and it is meant to hurt.

By the time Espresso works you have a state variable, an increment function,
and a decrement function. Doing that for five drinks means five copies of the
same three things, plus five copies of the same fifteen lines of markup — and
if the designer moves the price above the name, you make that change five
times and miss one.

```tsx
const [espressoCount, setEspressoCount] = useState(1);
const [latteCount, setLatteCount] = useState(1);
const [cappuccinoCount, setCappuccinoCount] = useState(1);
// ...and so on, forever
```

That copy-paste is the problem `demo2` solves. Feel it here first, or the next
demo is just a rearrangement of furniture for no reason.

## Worth noticing

- **State is what makes the screen redraw.** Changing a plain variable changes
  the number in memory and nothing on screen. React only repaints when you call
  a `set...` function.
- **The page is one long file on purpose.** It is the honest starting point, and
  it is completely readable — which is exactly why the repetition is so visible.
