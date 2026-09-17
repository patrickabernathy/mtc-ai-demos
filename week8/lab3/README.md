# lab3 — a login that survives the trip to the next page

Starts from `lab2`, finished: the catalog, About, Help, and a page per record
all work. There's no login anywhere yet.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Build a mock login (name and email, no real password) that stores the
logged-in shopper in a `UserContext` — the same shape as `demo2`'s cart
context, applied to "who's logged in" instead of "what's in the cart" — so an
account page and the header both know who's logged in, on any page. Bonus
points for also saving that shopper to a cookie, so the login survives a
refresh instead of resetting the way `demo1`'s clock does. Full step-by-step
guide, with checkpoints and hints, in `instructions.html`.

## The teaching point

Context survives a trip between pages because the pages sit inside the same
provider the whole time; it does not survive a refresh, because a refresh
throws the whole running app away and starts a new one from nothing — same
event as a plain `<a>` tag, same clock reset. A cookie is what carries
something across that specific gap, because it lives in the browser, not in
the app's memory.
