# Week 9, copy B — Tailwind installed, not turned on

Same store as `demo1/`. The three Tailwind packages are in `package.json` and
`postcss.config.mjs` is already here. **The `@import "tailwindcss"` line is
missing from `app/globals.css` on purpose.**

Use this folder if a live `npm install` cannot run. Skip the download. Write
`text-xl` on the heading. It will do nothing. Then add this as the first line
of `app/globals.css`:

```css
@import "tailwindcss";
```

Save. The heading changes — but it gets *smaller* and loses its bold, and so
does every other heading on the page. The import brings a reset that wipes the
browser's own heading sizes and spacing; `text-xl` (20px) is smaller than the
browser's default main heading (32px). That's expected, not broken.

Restart `npm run dev` after the PostCSS config appears, or the running server
never sees it.

There is no `tailwind.config.js`. The current Tailwind does not create one.

## How to run it

```
cd week9/copy-b
npm install
npm run dev
```

Open <http://localhost:3000>. Stop `demo1` first if it is already holding
that port.
