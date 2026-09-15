# Week 8, demo 4 — One fetch, two requests

> **This is the `answers` branch — the finished version.** The fetch is lifted to the parent, so the page makes one request and both children are handed the result. The `main` branch has the starting point the class works from.

Two components on one page. Both need the menu. Both go and get it. Each one is perfectly sensible
on its own, and together they ask the server the same question twice.

## How to run it

```
cd week8/demo4
npm install
npm run dev
```

Open <http://localhost:3000> **with DevTools open on the Network tab**. That is where the demo
happens — clear the log first, then refresh.

## What to do

**1. Count the requests.** Refresh with the Network tab open. There are two rows for `/api/menu`,
from one page load. Nothing deduplicates them — React does not, and neither does the browser. Each
component asked, so each component got.

The fake server is slowed down by 800ms on purpose so the two requests are easy to see, and so the
gap between them lasts long enough to matter.

**2. Notice the disagreement.** While one request has landed and the other has not, the two halves
of the page say different things: the summary is still working out prices while the list is already
showing them.

That is the *same bug as demo 2* arriving from the other direction — two components, two copies of
one fact, and a moment where they disagree.

**3. Fix it the same way.** Move the fetch up to the component that contains both, and hand the
result down:

```tsx
const [menu, setMenu] = useState<MenuItem[]>([]);

useEffect(() => {
  fetch("/api/menu").then((r) => r.json()).then(setMenu);
}, []);

<PriceSummary menu={menu} />
<MenuList menu={menu} />
```

One request. One copy. Both children lose their `useState`, their `useEffect` and their fetch, and
become components that just show what they are given.

## The teaching point

The rule was never really about state — it is about **facts**. One fact, one owner, everybody else
reads from it. Whether the fact is a number you typed or an answer from a server makes no difference
to the shape of the problem or the shape of the fix.

**This is not caching, and it is worth not pretending it is.** Caching means remembering an answer
so you never ask twice — across components, across pages, across visits — with rules about when the
remembered answer has gone stale. That is a real subject with real libraries and it comes later.
This fixes this page, honestly, and it is what you would reach for first anyway.

## The `states/` folder

Reference only.

| State | What it shows |
|---|---|
| `01-one-fetch` | The fetch lifted to the parent; both children handed the result |
