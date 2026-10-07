# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Teaching repo for the MTC AI-Enabled Full-Stack Developer program. Everything here is demo and lab code written live in front of a class — it is instructional material, not a product. Optimize for readability and for matching what was taught that week, not for cleverness.

## Layout

Code is organized by session: `week1/` through `week11/`, each containing `demo1/`, `demo2/`, ... (things built during lecture) and sometimes `lab1/`, `lab2/`, ... (things students build). Early weeks are plain HTML/CSS/JS; week4 introduces TypeScript; week5 onward is Next.js, each demo folder its own self-contained app with its own `package.json`.

Later demos in a week usually refactor the earlier one — e.g. week6 goes `demo1` (no components) → `demo2` (components) → `demo3` (client state) on the same coffee cart, then `demo4` (filter a list as you type), `demo5` (a one-page form) → `demo6` (the same form as a three-card wizard), then `demo7` (the menu fetched from a server) → `demo8` (the same fetch behind an `x-auth` header). When changing one, check whether the sibling demos are meant to stay in sync or to deliberately differ, since the difference between them *is* the lesson.

`week7/demo1` is different in kind: an untouched `create-next-app` scaffold whose lesson is the AI workflow itself, not the app. Its `docs/requirements.md`, `docs/design.md`, and `docs/plans/` are deliberately empty — they get filled in live — and it carries its own demo-local `.claude/commands/`.

Two folder conventions recur. A `states/` folder (`week5/demo1`, `week6/demo4`, `week6/demo7`, `week6/demo8`, all of `week8`, and `week9/demo1`) holds the page at each checkpoint reached in class; Next builds only what is under `app/`, so `states/` is reference material students copy over their own file, never live code. The week5 and week6 labs carry an `instructions.html` next to the code — that is the student handout for that lab.

`week9/demo1` is the Corner Store still on plain CSS (`className="card"` plus a `.card` rule). `week9/copy-b` is the same app with Tailwind v4 packages and `postcss.config.mjs` already present and the `@import "tailwindcss"` line left out on purpose — so a class like `text-xl` does nothing until the import is added. There is no `tailwind.config.js`; v4 does not create one. Restart `npm run dev` after the PostCSS config appears. Its `states/` run in the order the night does (`05`–`08` are the old-class and layout demos, `09`–`10` the Button). **`11-colour-prop-broken` has no fixed twin on `main`, on purpose:** Tailwind scans every file in the project, `states/` and READMEs included, so writing the red background class out in full anywhere on `main` would make that demo's break stop breaking. The fix (`12-colour-prop-fixed`) lives on `answers` only.

## Commands

There is no root `package.json` and no workspace. Every demo is its own project, so `cd` into the demo folder before running anything:

```
cd week6/demo3
npm install
npm run dev        # http://localhost:3000
```

- `npm run build` is the only real check in this repo — it type-checks and builds. A demo that builds is a demo that will not blow up on the projector.
- Week 4 is plain TypeScript, not Next: compile with `npx tsc` (`week4/lab3` wraps that as `npm run build`) and run the emitted `.js` with `node`.
- Weeks 1–3 are static files. Open the `.html` in a browser; there is nothing to install.

**There is no linter and no test suite anywhere in this repo** — no ESLint config, no test runner, no CI. Don't add one to a demo unless the lesson is about it. Verification here is `npm run build`, then opening the page and clicking the thing the lesson is about.

Only one demo can hold port 3000, so stop the previous `npm run dev` before starting the next.

## Branches

- **`main`** — the starting point students receive. It holds the demo code as it stands when class begins, before the exercise is worked. Keep it at the "before" state.
- **`answers`** — the answer key. The completed version of whatever the current demo asks students to build. Class runs the demo against `main`; `answers` is what it should look like when finished.
- **`demo-YYYYMMDD`** — a snapshot of what was actually typed during a specific live session. Historical record, not maintained.

Do not merge `answers` into `main` — that would hand students the solution. When a new exercise starts, `main` moves forward to the new starting point and `answers` is rebuilt on top of it.

## Do not over-engineer

**This is a beginners class.** That is the single most important constraint in this repo, and it outranks every instinct toward good production code. A demo exists to make one idea visible, and every extra layer buries it.

- Write the version a student could have written, not the version you'd ship. If there's an obvious way and a clever way, the obvious way is correct here.
- No abstraction until the lesson is *about* that abstraction. No custom hooks, no context, no reducers, no generic helpers, no config objects, no error-handling framework, no barrel files.
- No libraries beyond what the week has taught. No form libraries, no validation libraries, no state managers, no CSS frameworks. Hand-rolled and readable beats correct-and-opaque.
- Don't handle edge cases nobody will hit during a demo. Skip the loading states, the accessibility-beyond-labels, the defensive checks — they're real concerns in real apps and pure noise on a projector.
- Copy freely from earlier demos. Recognizing last week's pattern is a feature; inventing a new one each week is a cost students pay.
- Small files people can read top to bottom in one pass. If a demo file needs a scroll to understand, it's doing too much.

## Every demo gets a README

Demos are given live, but students come back to them alone, days later, with no
one to explain what they were looking at. Every `demoN/` and `labN/` folder gets
a `README.md` so the folder makes sense on its own. When you create a demo, write
its README as part of the same change; when you change what a demo does, update
its README in the same commit.

Keep it short — a page, skimmable, in the same plain voice as the code. It covers:

- **What this demo is** — one or two sentences. The idea it exists to make
  visible, and how it differs from the sibling demo it refactors.
- **How to run it** — the literal commands (`npm install`, `npm run dev`) and the
  URL to open. Assume they have forgotten.
- **What to do** — the exercise, written so someone can work it on their own
  without the lecture: what to change, in which file, and what should happen on
  screen when it works. This is the part that is usually missing.
- **The teaching point** — why it is done this way, the mistake it avoids, the
  thing worth remembering. Show the two or three lines that matter.
- **The `states/` folder**, if there is one — a table of each checkpoint and what
  it shows, plus the note that `states/` is reference only since Next builds only
  what is under `app/`.

`week6/demo4/README.md` and `week6/demo7/README.md` are the shape to copy.

Mind the branch: the README on `main` sets up the exercise and must not give away
the solution. The one on `answers` can describe the finished version.

## Conventions

- **New projects are Next.js + TypeScript** unless a lesson specifically calls for something else. Copy `next.config.ts`, `tsconfig.json`, and `.gitignore` from the nearest demo in the same lineage (see below) so the setup is identical every time.
- Plain `globals.css` with plain class names. No Tailwind, no CSS modules, no styled-components — **except `week9/`**, where Tailwind v4 *is* the lesson (`@import "tailwindcss"` plus `postcss.config.mjs`, not a JS config file).
- Props are typed inline in the function signature. Shared shapes go in a `types/` file only when more than one component needs them.
- Comments explain *why this is the teaching point*, not what the line does.
- **Two scaffold lineages live side by side, on purpose.** The hand-built demos (`week5/demo1` and all of `week6`) pin exact versions of Next 15.5.24 / React 19.2.8, keep `app/` at the demo root, and use plain CSS. `week5/demo2` and `week7/demo1` are untouched `create-next-app` output — Next 16.3.x on caret ranges, `src/app/`, Tailwind v4 — and exist precisely to show what the generator hands you. Don't reconcile one lineage into the other, and don't strip Tailwind out of a scaffold demo; that Tailwind is the generator's, not a convention being adopted.
- **From `week11/` on, the hand-built lineage is on Next 16.4.0** (React still 19.2.8, exact pins, `app/` at the root, plain CSS). Ruled 30 Sep and applied 7 Oct: *"we should be using 16."* `week11/demo1` is the Corner Store bumped from 15.5.24; `week11/demo2` is an API-only app — `app/api/` and no pages — whose lesson is `proxy.ts`, the Next 16 name for what Next 15 called `middleware.ts`. Write `proxy.ts`, never `middleware.ts`. Earlier weeks stay on 15.5.24 as a record of what was taught. The back end is Next route handlers; there is no Express anywhere in this repo, on purpose. `next dev` on 16 writes an `AGENTS.md` into each project; commit it.
