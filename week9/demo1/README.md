# Week 9, demo 1 — the stylesheet that lies

The Corner Store from week 8, still styled the Week 3 way: a class name on the
element, a matching rule in `app/globals.css`. The first thing we do is rename
one of those and watch the look disappear with no error.

This is the **start** state. Clone this folder, not `copy-b`.

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

There is no `tailwind.config.js`. The current version of Tailwind does not
create one. Older tutorials you Google will still ask for it.

### 3. Restyle one card

Rewrite **one** product card with utility classes and **delete the `.card`
rule**. Three changes: type size, space, colour. Say the CSS out loud as you
type (`text-xl` is `font-size`, `p-4` is `padding`, `text-gray-500` is
`color`).

If nothing happens, suspect the class name first. `text-red` is not a class.
`text-red-500` is.

### 4. Extract a Button

The same `className="bg-green-600 text-white px-4 py-2 rounded"` will end up on
the card, the header, the cart page, and checkout. Put it in one
`components/Button.tsx` and use `<Button>` in all four places. Change the green
in that one file and all four move.

In this system, duplication becomes a component, not a CSS class. A `.btn` rule
puts the two-file problem back.

## The teaching point

A misspelled function blows up. A misspelled (or renamed) CSS class does not.
Tailwind inherits that exact behaviour: an invalid utility class is silently
ignored. The look now lives on the element so there is no second file to drift
— and when you need the same look four times, you extract a component.

## The `states/` folder

Each step, frozen. **Reference only** — Next builds only what is under `app/`,
so nothing in here runs where it sits. Copy a file over your own to catch up.

| State | What it shows |
|---|---|
| `01-start` | Plain CSS. `className="card"` and a matching `.card` rule. Where we begin |
| `02-class-rename-break` | Component says `product-card`; CSS still says `.card`. Look is gone |
| `03-tailwind-installed` | Packages + PostCSS config. The `@import` is still missing. `text-xl` does nothing |
| `04-restyled` | Import added. The card rewritten in utilities. The `.card` rule deleted |
| `05-button-duplicated` | The same button string pasted on the card, header, cart page, and checkout |
| `06-button-extracted` | `Button.tsx`, four call sites, one colour change hits all four |

`copy-b/` next door is a full runnable copy of `03-tailwind-installed` — use it
if `npm install` cannot run. Skip the download, still skip the import, still
write `text-xl` and watch it do nothing, then add the import.
