# filterdemo — filter a list as you type

Slide 30's exercise, built out. A list of fourteen drinks and one text box that
narrows the list on every keystroke.

## Install and run

```
npm install
npm run dev
```

## What to do

`app/page.tsx` renders all fourteen drinks and ignores the box. Make it filter.

1. Work out the search text once, above the JSX: `query.trim().toLowerCase()`.
2. Build the list to show with `.filter()` — keep a drink if its name contains
   that text. Do **not** put the result in `useState`.
3. Render `results` instead of `drinks`, and make the count line honest:
   "4 of 14 drinks".
4. Type `latte` in lower case. It finds nothing until you lower-case both sides.
5. Say something when nothing matches. A blank list looks broken.
6. Search the category as well as the name, so typing `tea` finds the whole tea
   section.
7. Add a **Clear** button that shows only when there is something to clear.

## Why this one matters

It is the payoff of the whole "one source of truth" idea. There is **one** piece
of state here — what the customer typed:

```ts
const [query, setQuery] = useState("");
```

The filtered list is not state. It is worked out fresh every render, from the
query and the full list:

```ts
const results = drinks.filter((drink) => drink.name.toLowerCase().includes(q));
```

Nothing to keep in sync, so nothing can get out of sync. Compare that with
`states/05-the-stale-trap`, where the results *are* stored in their own state
and go wrong the moment anything else changes the menu.

## The states

`states/` holds the page at each step. Copy one over `app/page.tsx` to jump
there. Next only runs what is under `app/`, so these are reference only.

| State | What it shows |
|---|---|
| `01-start` | The box works, the list ignores it. Where we begin |
| `02-case-sensitive` | Filtering, but `latte` finds nothing and `Latte` works |
| `03-case-fixed` | `.toLowerCase()` on both sides |
| `04-name-or-category` | Searching two fields, an empty state, and a Clear button |
| `05-the-stale-trap` | The version that stores the results in state, and breaks |

## Things worth noticing

- **`.filter()` does not change the original list.** It hands back a new,
  shorter one. `drinks` is untouched, which is why you can keep filtering it.
- **You decide what "matches" means.** `04` searches the name *or* the category,
  so typing `tea` finds the whole tea section. That is a product decision, not a
  technical one.
- **`.trim()` on the query** stops a stray space from emptying the list.
- **Zero results is a real state and needs its own sentence.** A silently blank
  list looks broken. "Nothing matches X" does not.
