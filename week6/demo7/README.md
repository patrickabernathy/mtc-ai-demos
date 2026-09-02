# demo7 — the same menu, behind a locked door

Identical to `demo6`, with one difference: `MENU_URL` points at a server that
will not talk to you unless you prove who you are.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000. **It does not work yet. That is the point.**

## What you should see

The error state you built in demo6 — "We could not load the menu" and a Try
again button. Clicking Try again does not help, because nothing about the
request is going to change.

Open the Network tab (F12 → Network) and click the failed request. The status
is **403 Forbidden**, and the reply says:

```
Authorization data is wrong!
```

The server is not broken. It is not slow. It answered immediately, and the
answer was *no*.

## Why this is the normal case, not the unusual one

Almost every API you will ever call wants credentials. A weather API, a
payments API, a mapping API, your own API in Week 11 — all of them need to
know who is asking, because somebody is paying for the answer and somebody
else should not be able to run up that bill.

`fetch` sends nothing extra by default. If a server wants a header, you have
to put it there.

## The fix

`fetch` takes a second argument — an options object. Headers go in it:

```ts
const res = await fetch(MENU_URL, {
  headers: {
    "x-auth": "mtc-fall-2026",
  },
});
```

`x-auth` is the header *this* server happens to want. There is no universal
name for it. Other servers want `Authorization: Bearer <token>`, or
`X-API-Key`, or something they invented. **The API's own documentation is the
only way to know**, and reading that documentation is the actual skill here.

`states/01-header-added/page.tsx` is that change, already made.

This endpoint takes the same `?delay=`, `?state=` and `?status=` options as the open one in
demo6, so once the header is in you can still force any failure you want on top of it.

## The extra round trip you can't see

Sending a header the server didn't ask for by default means the browser does something extra
first: it sends a small "may I?" request, called a **preflight**, before your real one. Only if
that comes back approved does your actual request go out.

You can watch it happen. Open the Network tab and you'll see *two* entries for one `fetch` —
an `OPTIONS` request, then the `GET`. That's normal and there's nothing to fix; it's worth
knowing only because it means a request with a custom header does twice the travelling.

One thing it's genuinely useful to know: **a CORS error is not always a CORS problem.** If a
cross-origin request fails for any reason at all — including the server simply not answering in
time — the browser reports it as a CORS error, because it can't tell the difference between
"didn't answer" and "refused." So if you ever see:

```
blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

check whether the server is actually up before you go changing your code. Switching `MENU_URL`
to `"/api/menu"` is the fastest way to find out: the local copy demands the same header, so if
that works, your code was never the problem.

## Read this part before you use a real API key

The key above is sitting in plain text in a file that runs **in the browser**.
Anyone who opens your page can read it — View Source, or the Network tab, or
the Sources panel. It is not hidden, and there is no way to hide it in code
that runs on somebody else's computer.

That is fine here, because the worst thing an attacker can do with
`mtc-fall-2026` is find out what a latte costs.

It is **not** fine for a key that costs money or touches somebody's data. The
real answer is that the browser never sees that key at all: the browser asks
*your* server, and your server — which nobody can read — asks the real API.
Writing that server is Week 11.

So the rule to carry out of tonight: **a key in front-end code is a public
key.** If it would hurt to publish it, it does not go there.
