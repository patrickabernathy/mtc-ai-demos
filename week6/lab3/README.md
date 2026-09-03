# lab3 — fetch reviews from a locked door

The bakery's menu and cart are done for you, same as `lab2`'s finished
version. Underneath them is a "What people are saying" section reading two
reviews straight out of `types/review.ts`. Tonight that section starts
asking a real, authenticated server for the real reviews.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Replace the static reviews with a `useState` + `useEffect` fetch against
`https://n8n.aseglave.net/webhook/mtc-reviews-auth`, which requires an
`Authorization: Bearer mtc-fall-2026` header and won't answer without one.
Handle all four situations — loading, empty, loaded, and error with a retry —
the same shape `demo7` and `demo8` used for the menu.

`instructions.html` has the full walkthrough, including what `async`/`await`
actually does and why `fetch` needs it — read that section even if you
already have working fetch code from a demo, since it explains the *why*,
not just the syntax.

## The teaching point

`fetch` returns a promise, not data — `await` is what turns "I'll have this
eventually" into a value your code can use, without freezing the page while
it waits. And `fetch` doesn't throw on a 404 or 500; checking `res.ok`
yourself is the only way to catch a server that answered with bad news.
