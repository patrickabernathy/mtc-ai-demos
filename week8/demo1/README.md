# Week 8, demo 1 — Many pages, one app

> **This is the `answers` branch — the finished version.** Every page has been made, the nav uses `<Link>`, the drink page fetches from the server and handles a bad address, and the filter lives in the query string. The `main` branch has the starting point the class works from.

The coffee store from week 6, with **one page and nothing else**. Everything else gets built in
front of you: the pages, the nav, a page per drink, and a filter that lives in the address bar.

This is deliberately the "before" state. If you clone it and run it, you get a store with a working
cart and no second screen — which is exactly where class starts.

## How to run it

```
git clone https://github.com/patrickabernathy/mtc-ai-demos
cd mtc-ai-demos/week8/demo1
npm install
npm run dev
```

Open <http://localhost:3000>. Only one project can hold port 3000, so stop any other
`npm run dev` first.

## The clock in the header

`components/Header.tsx` shows **App started at 6:34:12**. That time is stamped once, when the app
first starts running, and never changes:

```tsx
const [startedAt] = useState(() => new Date().toLocaleTimeString());
```

It is a measuring instrument. **If that time ever changes, the whole application was thrown away and
a new one started.** You cannot see that happen; you can see the clock change.

## What to do

### 1. Make a page

There is no list of routes anywhere in this project. **The `app/` folder is the routing table.** A
folder with a file called `page.tsx` in it is a page, and the folder's name is the address.

Make `app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <main>
      <h2>About us</h2>
      <p>We have been grinding beans since Tuesday.</p>
    </main>
  );
}
```

Save it and visit `/about`. It exists. You did not register it, import it, or tell anything about
it.

`export default` matters — the framework looks for exactly that in a `page.tsx`.

### 2. Nest them

Folders nest and the address nests with them. `app/drinks/hot/page.tsx` answers `/drinks/hot`. Two
folders deep, two segments in the URL, still one `page.tsx` doing the work.

### 3. Wrap a section

`layout.tsx` wraps every page at or below its own folder. `app/drinks/layout.tsx` wraps `/drinks`
and `/drinks/hot`, and leaves the home page alone. The root `app/layout.tsx` wraps everything —
which is where the header lives, and why it does not flicker.

```tsx
export default function DrinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="section">
      <p className="crumb">Menu / Drinks</p>
      {children}
    </div>
  );
}
```

`children` is whatever page is being shown underneath.

**The special filenames**, all of which live next to each other in a folder:

| File | What it is |
|---|---|
| `page.tsx` | The page at this address |
| `layout.tsx` | Wraps this folder and everything below it |
| `not-found.tsx` | Shown when `notFound()` is called |
| `loading.tsx` | Shown while the page is loading |
| `error.tsx` | Shown if the page throws |

### 4. Move between pages without destroying everything

Add a nav to the header using plain `<a href="/about">`. Put three drinks in the cart, click About,
click Back. The cart is empty **and the clock has changed** — the whole application was torn down
and rebuilt.

Swap to `<Link>`:

```tsx
import Link from "next/link";

<Link href="/about">About</Link>
```

Same trip again. **The clock holds still — and the cart is still empty.** Two different losses, and
being able to tell them apart is the point:

- A plain `<a>` destroys **the whole application**. Every variable, all state, all of it. The
  browser requests a fresh document and runs your code from zero.
- `<Link>` cancels that — the same move as `e.preventDefault()` on the form in week 6 — then fetches
  just the new page, swaps that part of the screen, and rewrites the address bar so Back still
  works. But it still **swaps the page**, so anything held on the page you left goes with it.

The cart lives on the menu page. Where it should live instead is the next session.

### 5. A page per drink

`app/drinks/[id]/page.tsx`. Square brackets mean "anything can go here, and I want to know what it
was" — one file for every drink.

```tsx
"use client";
import { useParams } from "next/navigation";

const params = useParams();
const id = params.id;   // the bit that was in the brackets
```

Then visit `/drinks/9999` and watch it crash, because nothing considered the address being wrong.
Add the guard:

```tsx
import { notFound } from "next/navigation";

const drink = menu.find((d) => d.id === id);
if (!drink) notFound();
```

### 6. Find the bug you now have

Your page probably fails for real drinks too. `console.log(typeof params.id)` — everything from the
address bar is **text**, so `"3" === 3` is `false`, `find` finds nothing, and your new not-found
page shows for a drink that exists, with no error anywhere. Convert once, where it comes in:

```tsx
const id = Number(params.id);
```

### 7. A filter you can send someone

Filter the menu with `useState`, then copy the address and open it elsewhere — you get the whole
menu, because the filter only ever existed in one browser's memory. Move it into the address:

```tsx
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const q = searchParams.get("q") ?? "";
```

Now `/menu?q=oat` arrives filtered, survives a refresh, and can be sent.

## The teaching point

**The `app/` folder is the routing table, and the address bar is an input.** Those two ideas carry
the whole session. Everything else follows: a wrong address is possible so it has to be handled; a
value from the address is text so it has to be converted; and state that lives on a page leaves with
the page.

## The `states/` folder

Each step, frozen. **Reference only** — Next builds only what is under `app/`, so nothing in here
runs where it sits. Copy a file over your own to catch up or compare.

| State | What it shows |
|---|---|
| `01-first-page` | The simplest possible page |
| `02-nested-route` | Nested folders, nested address |
| `03-section-layout` | A layout wrapping one section only |
| `04-nav-anchor` | The nav with plain `<a>` — destroys the app |
| `05-nav-link` | The same nav with `<Link>` |
| `06-detail-crash` | `[id]` with no guard — crashes on a bad address |
| `07-not-found` | `notFound()` plus a custom `not-found.tsx` |
| `08-type-bug` | The silent one: `"3" === 3` is false |
| `09-number-fix` | Converting once, at the doorway |
| `10-filter-state` | A filter that works and cannot be shared |
| `11-filter-query` | The same filter, living in the address |

`states/` is excluded from type-checking in `tsconfig.json`, because several are deliberately broken
and are supposed to stay that way.

## One thing that will bite you later

`useSearchParams` works under `npm run dev` and **fails `npm run build`** with a message about a
Suspense boundary. The query string is not known until somebody visits, so the framework needs you to
mark the part of the page that waits:

```tsx
import { Suspense } from "react";

<Suspense fallback={<p>Loading...</p>}>
  <FilteredMenu />
</Suspense>
```

Not part of this week's lesson — noted so it costs you two minutes rather than an evening.
