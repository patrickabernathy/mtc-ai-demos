# Week 8, demo 2 — One truth, several components

Two components that each keep their own note of how much is in the cart. They agree until they
don't, and when they stop agreeing nothing errors — the app just quietly lies.

Refactors `demo1`: same store, same menu. The difference is that this one starts broken on purpose.

## How to run it

```
cd week8/demo2
npm install
npm run dev
```

Open <http://localhost:3000>. Stop any other `npm run dev` first — only one can hold port 3000.

## What to do

**1. Watch them disagree.** `CartBadge` has its own `useState` holding a count. `CartList` has its
own `useState` holding the items. Both currently say 3. Click **Add a Mocha**.

The list says 4. The badge still says 3, and it will keep saying 3 until you reload the whole page.
Nothing errored. There is no red text anywhere. The app is simply wrong.

**2. Give the fact one owner.** Neither number is wrong — there are just two of them. Delete one.
Move the survivor up into `page.tsx`, the component that contains both, and hand each child what it
needs:

```tsx
const [items, setItems] = useState(menu.slice(0, 3));

<CartBadge count={items.length} />
<CartList items={items} onAdd={...} />
```

Notice what `CartBadge` loses: it has no `useState` at all now. That is the usual side effect — the
component gets simpler.

This move is called **lifting state up**, and it is the most common refactor in React.

**3. Don't store what you can work out.** The badge never needed a count. It needed the list, and
`items.length` works the count out fresh every time. Every value you store is a value that can go
stale; a value you calculate cannot.

**4. Now cross a page boundary.** Lifting works because both components share a parent. Put the cart
on a *second page* and the rule runs out of road: the only thing containing both pages is
`layout.tsx`, and a layout cannot hand props to `{children}` — it never sees which page it is
wrapping.

What you want is *a value a whole section of the app can read without being handed it at every step*.
That is **context**. Three pieces in one file — see `states/02-context/CartContext.tsx`.

## The teaching point

**One fact, one owner.** If two components each hold their own copy of something, they will
eventually disagree, silently, and stay that way. That is a worse bug than a crash: a crash tells you
where it happened, this tells you nothing, because from the code's point of view nothing went wrong.

Context is the right tool for roughly three things in an app — the cart, who is logged in, the theme.
For anything two neighbouring components share, a prop is clearer and easier to delete. The test: if
you can name an owner, it should be a prop.

## The `states/` folder

Reference only — Next builds what is under `app/`, so nothing here runs where it sits. Copy a file
over your own to catch up.

| State | What it shows |
|---|---|
| `01-lifted` | One owner in `page.tsx`, both children handed what they need |
| `02-context` | The cart in a context, provided by the layout, readable from any page |

Each file's import paths are written for where it lands, not for where it sits. `page.tsx` and
`layout.tsx` go in `app/`; everything else goes in `components/`.
