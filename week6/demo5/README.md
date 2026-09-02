# demo5 — a form that pushes back

A pickup order form: name, email, phone, and a time. It looks finished and it
is completely inert — you can type in it, but React has no idea what you typed,
and pressing **Place order** reloads the page.

One file, `app/page.tsx`. No components, no shared types. Everything this page
needs is on this page.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

Turn it into a form that checks its own answers.

1. Add `"use client"` and `useState`. Give each field a piece of state —
   `name`, `email`, `phone`, `pickup` — all starting as `""`.
2. Make each input **controlled**: `value={name}` and
   `onChange={(event) => setName(event.target.value)}`. Now the state is the
   truth and the box on screen is just a picture of it.
3. Work out what's wrong, *without* storing it in state. Build a plain `errors`
   object during render:

   ```tsx
   const errors: Errors = {};
   if (name.trim() === "") {
     errors.name = "We need a name for the cup.";
   }
   ```

   A name that's blank, an email with no `@`, a phone that isn't 10 digits once
   you strip out everything that isn't a number, and no pickup time chosen.
4. Don't nag before they've tried. Add a `showErrors` state that starts `false`
   and flips to `true` on the first submit, and only render a message when
   `showErrors && errors.name`.
5. Handle submit: `onSubmit={handleSubmit}` on the `<form>`, and
   `event.preventDefault()` as the first line inside it — otherwise the browser
   reloads the page and everything you typed is gone.
6. If there are no errors, show a confirmation instead of the form: a `placed`
   state, and an early `return` with a thank-you when it's true.

The CSS is already written. Put `className="invalid"` on a bad input to turn it
red, `<p className="error">` on a message, and `className="success"` on the
confirmation.

## The teaching point

**Errors are not state. They are worked out from state.**

There's a strong pull toward `const [errors, setErrors] = useState({})` and
updating it in every `onChange`. Don't. The moment errors are stored, you own
the job of keeping them true — and the day someone fixes a field without
triggering your update, the page shows a complaint about something that is now
correct.

Calculating them fresh on every render costs nothing and cannot go stale. It is
the same idea as `demo4`: one source of truth, everything else derived from it.

## Worth noticing

- **`event.preventDefault()` is not optional.** A `<form>` submitting is the
  browser's oldest behaviour, and it wipes the page.
- **`showErrors` is about manners, not correctness.** The errors exist from the
  first render; that flag only decides when it's polite to mention them.
- **Every input needs a `<label htmlFor>`.** The one accessibility rule we do
  not skip, because it costs nothing and makes the box clickable by its label.
