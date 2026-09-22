# Week 9, demo 1 — the stylesheet that lies, then Tailwind start to finish

The Corner Store from week 8, still styled the Week 3 way: a class name on the
element, a matching rule in `app/globals.css`. The first thing we do is rename
one of those and watch the look disappear with no error. By the end of the
night the look lives on the element, the header is a row, the product list has
a breakpoint, and it all survives a 375-pixel phone.

**This is the `answers` branch.** `app/` and `components/` here are the
**finished** store — where the night ends, not where it starts:

- Tailwind installed and turned on (`package.json`, `postcss.config.mjs`,
  `@import "tailwindcss"` on line 1 of `globals.css`).
- The card in utilities, with `hover:bg-gray-100`; the old `.card`, `.tagline`
  and `.add-btn` rules deleted, because nothing uses them any more.
- The header a stack on a phone and a row from `md` up
  (`flex flex-col md:flex-row gap-4 md:items-center md:justify-between`).
- The product list one column on a phone, three from `md` up
  (`grid grid-cols-1 md:grid-cols-3 gap-4`).
- One `components/Button.tsx` used on the card, the header, the cart page, and
  checkout.

Run it the same way and check it at 375 pixels in the device toolbar. On `main`,
this folder is the plain-CSS starting point.

The overflow colour-prop demo's fix is `states/12-colour-prop-fixed`: a lookup
object of whole class names, because Tailwind reads your files as text and only
makes classes it finds written out in full:

```tsx
const colours = {
  green: "bg-green-600 hover:bg-green-700",
  red: "bg-red-600 hover:bg-red-700",
};
// colour: "green" | "red"
className={`${colours[colour]} text-white px-4 py-2 rounded`}
```

It isn't on `main` on purpose: with those whole names anywhere in the project,
the red button would work before the fix and the demo would have nothing to show.

## How to run it

```
cd week9/demo1
npm install
npm run dev
```

Open <http://localhost:3000>. Stop any other `npm run dev` first — only one can
hold port 3000.

## What to do

### 1. The two files that have to match

Open `components/ProductCard.tsx` and `app/globals.css` side by side. Point at
the word `card` in both. That is the deal Week 3 made: keep the two in sync by
hand, forever.

Rename `card` to `product-card` in the component only. Do not touch the CSS.
Save. The box around each drink is gone. Nothing in the editor went red. Nothing
in the console printed. A class name the stylesheet doesn't know is silently
ignored.

### 2. Install Tailwind

Three packages, then two small files. **Restart `npm run dev` after the config
file appears**, or the running server never sees it.

```
npm install tailwindcss @tailwindcss/postcss postcss
```

Create `postcss.config.mjs` at the project root:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

Add this as the **first line** of `app/globals.css`:

```css
@import "tailwindcss";
```

If you skip the import, `text-xl` on a heading does nothing — same silence as
the renamed class. Installed is not the same as turned on.

When you do add it, **the page gets plainer, not fancier.** The import brings a
reset that wipes the browser's own styles: headings drop to the size and weight
of normal text, and the default spacing disappears. The main heading with
`text-xl` actually gets *smaller* (32px bold down to 20px). That's expected —
from here on, everything big or bold is big or bold because you said so.

There is no `tailwind.config.js`. The current version of Tailwind does not
create one. Older tutorials you Google will still ask for it.

### 3. Restyle one card

Rewrite **one** product card with utility classes and **delete the `.card`
rule**. Three changes: type size, space, colour. Say the CSS out loud as you
type (`text-xl` is `font-size`, `p-4` is `padding`, `text-gray-500` is
`color`).

If nothing happens, suspect the class name first. `text-red` is not a class.
`text-red-500` is.

### 4. A real class that still loses

In `components/Header.tsx`, add `text-red-500` to the tagline **without**
removing its old `tagline` class. It stays grey.

The class is real — it's the old `.tagline` rule in `globals.css` that wins.
Tailwind files its classes in CSS *layers*, and plain CSS that isn't in any
layer beats everything that is. Right-click the tagline → **Inspect**: in the
Styles pane, `.text-red-500`'s colour is crossed out. Take `tagline` off the
element and it goes red.

So when a class does nothing, there are two suspects: the name isn't real, or
an old class is beating it.

### 5. Make the header a row

Add `flex` to the `<header>` — the parent, not one of the four things inside it.
Then `gap-4` (they're touching), then `items-center` (the Order now button is
stretched to the height of the nav), then `justify-between` (button to the right
edge).

### 6. The phone test, and one breakpoint

Open DevTools, turn on the device toolbar (`Ctrl+Shift+M`, `Cmd+Shift+M` on a
Mac), and set the width to **375**. The header row is crushed.

In `components/MenuList.tsx`, replace `menu-list` with a grid. Try it the way
the sentence sounds first — `grid grid-cols-3 md:grid-cols-1 gap-4` — and look at
375: three skinny columns. The class with **no prefix** applies on every screen,
phones included; `md:` is the upgrade from 768px up. Swap them so the phone
gets the unprefixed class. Then do the same for the header with
`flex-col md:flex-row`.

### 7. Extract a Button

The same `className="bg-green-600 text-white px-4 py-2 rounded"` will end up on
the card, the header, the cart page, and checkout. Put it in one
`components/Button.tsx` and use `<Button>` in all four places. Change the green
in that one file and all four move.

In this system, duplication becomes a component, not a CSS class. A `.btn` rule
puts the two-file problem back.

### 8. If there's time: one Button, two colours

Give `Button` a `colour` prop and build the class from it:
`` className={`bg-${colour}-600 ...`} ``. Use `colour="green"` on Add to cart and
`colour="red"` on the cart's Remove button (add a drink first so the cart shows
it). Green works. Red has no background at all.

Work out why before you look. (Hint: Tailwind never runs your code.) The
finished version is on the `answers` branch.

## The teaching point

A misspelled function blows up. A misspelled (or renamed) CSS class does not.
Tailwind inherits that exact behaviour: an invalid utility class is silently
ignored. The look now lives on the element so there is no second file to drift
— and when you need the same look four times, you extract a component.

Layout goes on the parent: `flex`, `grid`, `gap`, `items-`, `justify-` all
style the box that holds the children. And the phone comes first: write the
small screen with no prefix, then upgrade with `md:`.

## The `states/` folder

Each step, frozen, in the order the night runs. **Reference only** — Next builds only what is under `app/`,
so nothing in here runs where it sits. Copy a file over your own to catch up
(`cart-page.tsx` goes to `app/cart/page.tsx`, `checkout-page.tsx` to
`app/checkout/page.tsx`, everything else to `components/`).

| State | What it shows |
|---|---|
| `01-start` | Plain CSS. `className="card"` and a matching `.card` rule. Where we begin |
| `02-class-rename-break` | Component says `product-card`; CSS still says `.card`. Look is gone |
| `03-tailwind-installed` | Packages + PostCSS config. The `@import` is still missing. `text-xl` does nothing |
| `04-restyled` | Import added. The card rewritten in utilities. The `.card` rule deleted |
| `05-old-class-wins` | `tagline text-red-500` on the header — a real class, still grey |
| `06-header-flex` | The header as a row: `flex gap-4 items-center justify-between`. Hover on the card |
| `07-grid-backwards` | `grid-cols-3 md:grid-cols-1` — three columns on a phone, one on a laptop |
| `08-responsive` | Phone first: `grid-cols-1 md:grid-cols-3`, and the header `flex-col md:flex-row` |
| `09-button-duplicated` | The same button string pasted on the card, header, cart page, and checkout |
| `10-button-extracted` | `Button.tsx`, four call sites, one colour change hits all four |
| `11-colour-prop-broken` | A `colour` prop that builds the class from pieces. Green works; red doesn't |
| `12-colour-prop-fixed` | **`answers` only.** Whole class names in a lookup object; both colours work |

`copy-b/` next door is a full runnable copy of `03-tailwind-installed` — use it
if `npm install` cannot run. Skip the download, still skip the import, still
write `text-xl` and watch it do nothing, then add the import.
