# Week 8, demo 1 — Many pages, one app

The coffee store from week 6, with more than one screen. Where week 6 was about one page that
worked, this is about what happens the moment there are two: links that destroy your app, addresses
that carry a value, addresses that are wrong, and pages that draw before their data arrives.

It refactors `week6/demo3` — same menu, same cart, same components. Two things are new: every drink
now has an `id`, and the header has a clock in it.

## How to run it

```
cd week8/demo1
npm install
npm run dev
```

Open <http://localhost:3000>. Only one demo can hold port 3000, so stop any other `npm run dev`
first.

## The clock in the header

`components/Header.tsx` shows **App started at 6:34:12**. That time is stamped once, when the
application first starts running, and never changes:

```tsx
const [startedAt] = useState(() => new Date().toLocaleTimeString());
```

It is there as a measuring instrument. **If that time ever changes, the whole application was
thrown away and a new one was started.** You cannot see that happen; you can see the clock change.

The header lives in `app/layout.tsx`, not on a page, which is why it stays put while pages swap
underneath it.

## What to do

Work these in order. Each one is a thing that breaks, then the fix.

**1. The link that destroys everything.** Put three drinks in the cart. The header links are plain
`<a href="/cart">`. Click Cart, then click Back. Two things to notice: the cart is empty, and the
clock has changed. The clock is the important one — a plain `<a>` tells the browser to throw the
entire running application away and start over, so your cart never had a chance.

Now swap both header links to `<Link>`:

```tsx
import Link from "next/link";

<Link href="/cart">Cart</Link>
```

Do the same trip again. **The clock holds still — and the cart is still empty.** That pair is the
whole point of this demo. `<Link>` saved the *application*. It cannot save the *cart*, because the
cart lives in state on the menu page and you left the menu page. Where the cart should live instead
is the next demo's problem.

**2. A page per drink.** Make `app/drinks/[id]/page.tsx`. Square brackets round a folder name mean
"anything can go here, and I want to know what it was" — one file that serves every drink.

```tsx
"use client";
import { useParams } from "next/navigation";

const params = useParams();
const id = params.id;   // the bit that was in the brackets
```

Show the drink's name. Then visit `/drinks/9999` and watch it crash.

**3. Say so properly.** Add the guard:

```tsx
import { notFound } from "next/navigation";

const drink = menu.find((d) => d.id === id);
if (!drink) notFound();
```

Prove it by typing a garbage number in the address bar. Optionally add your own `not-found.tsx`
next to the page.

**4. Find the bug you now have.** Your page probably does not work even for real drinks. Add
`console.log(typeof params.id)` and read what it prints. Everything arriving from the address bar
is **text**, so `"3" === 3` is `false`, `find` finds nothing, and your brand-new not-found page
shows for a drink that exists — with no error anywhere. Convert once, where the value comes in:

```tsx
const id = Number(params.id);
```

**5. Fetch the drink instead.** There is a pretend server at `/api/drinks/[id]`, deliberately slow
by about 600ms so the waiting is visible. Swap the local list for a `fetch` inside `useEffect`,
leave the guard off, and watch it crash — the page draws before the answer arrives, every time.
Then handle it with the same states you built for the menu in week 6: loading, error, not-found,
then the drink.

**6. A filter you can send someone.** Add a filter box to the menu using `useState`. Filter to
"oat", copy the address out of the bar, and open it in another window. You get the whole menu — the
filter only ever existed in one browser's memory. Move it into the address instead:

```tsx
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const q = searchParams.get("q") ?? "";
```

Now `/menu?q=oat` arrives filtered, survives a refresh, and can be sent to someone.

## The teaching point

Three of the four things here are the same idea wearing different clothes: **what you were handed
is not necessarily what you assumed.** The address might be wrong. The value might be text when you
expected a number. The data might not have arrived yet. None of those three announce themselves —
there is no error message for a silently-wrong comparison or an unshareable filter.

The fourth is about scope: a plain `<a>` destroys the whole application, and navigating at all
destroys whatever was being held on the page you left. Those are two different losses and it is
worth being able to say which is which.

## The `states/` folder

Each checkpoint, frozen. **Reference only** — Next builds only what is under `app/`, so nothing in
here runs where it sits. Copy a file over your own to catch up or to compare against a working
version.

| State | What it shows |
|---|---|
| `01-link` | The header after the `<Link>` fix |
| `02-detail-crash` | The drink page with no guard — crashes on a bad id |
| `03-not-found` | The same page with `notFound()`, plus a custom `not-found.tsx` |
| `04-type-bug` | The silent one: `"3" === 3` is false, so a real drink shows as missing |
| `05-number-fix` | Converting once, at the doorway |
| `06-fetch-crash` | Fetching the drink with no loading guard |
| `07-detail-states` | The same fetch with loading, error and not-found handled |
| `08-filter-state` | A filter that works and cannot be shared |
| `09-filter-query` | The same filter, living in the address |

`states/` is excluded from type-checking in `tsconfig.json`, because several of these are
deliberately broken and are supposed to stay that way.

## One thing that will bite you later

`useSearchParams` works perfectly under `npm run dev` and **fails `npm run build`** with a message
about needing a Suspense boundary. The query string is not known until somebody actually visits, so
the framework needs you to mark the part of the page that has to wait. The fix is to move the
component that reads it into its own file and wrap it:

```tsx
import { Suspense } from "react";

<Suspense fallback={<p>Loading...</p>}>
  <FilteredMenu />
</Suspense>
```

Not part of this week's lesson — noted here so it costs you two minutes rather than an evening.
