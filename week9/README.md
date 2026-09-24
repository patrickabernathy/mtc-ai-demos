# Week 9 — restyle the Corner Store

The Daily Grind from week 8, still styled with a CSS file. This week the look
moves onto the element itself.

Four folders:

| Folder | What it is |
|---|---|
| **`demo1/`** | **Start here.** Plain CSS, a product card whose class name lives in two files. |
| **`copy-b/`** | Same store, Tailwind already installed, **not turned on**. The `@import` line is missing on purpose. |
| **`lab1/`** | Lab. Picks up where `demo1` leaves off in class — finish converting the leftover CSS, then use `flex` and `position` to lay the menu and cart out side by side and pin a badge to a card. |
| **`lab2/`** | Lab. One `Button` component, one look, used in four places including a Remove button that shouldn't look like the rest. Give it `colour` and `size` variants without breaking Tailwind's build-time scan. |

## How to run the starting point

```
git clone https://github.com/patrickabernathy/mtc-ai-demos
cd mtc-ai-demos/week9/demo1
npm install
npm run dev
```

Open <http://localhost:3000>. Only one project can hold port 3000, so stop any
other `npm run dev` first.
