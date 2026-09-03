# lab3 — fetch reviews from a locked door (answer)

The finished version of the `main` branch exercise. The reviews section now
fetches from a real, authenticated server instead of reading
`types/review.ts`.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000. Reviews load after about a second. Try
appending `?delay=4000`, `?state=empty`, `?state=error`, or `?status=404` to
`REVIEWS_URL` in `app/page.tsx` to see the other three situations.

## What this shows

`reviews`/`loading`/`error` state lives in `page.tsx` (same place as
`demo7`/`demo8` keep it) and gets passed down to `ReviewList` as props,
which renders all four situations. `loadReviews` is `async`, checks
`res.ok` itself before trusting the body, and is reused by both the initial
`useEffect` and the Try again button. `types/review.ts` keeps
`sampleReviews` around as a fallback/reference — nothing imports it anymore.

`instructions.html` has the full guided walkthrough, including what
`async`/`await` actually does and why `fetch` needs it.

## The teaching point

`fetch` returns a promise, not data — `await` is what turns "I'll have this
eventually" into a value your code can use, without freezing the page while
it waits. And `fetch` doesn't throw on a 404 or 500; checking `res.ok`
yourself is the only way to catch a server that answered with bad news.
