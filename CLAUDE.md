# CLAUDE.md

Teaching repo for the MTC AI-Enabled Full-Stack Developer program. Everything here is demo and lab code written live in front of a class — it is instructional material, not a product. Optimize for readability and for matching what was taught that week, not for cleverness.

## Layout

Code is organized by session: `week1/` through `week6/`, each containing `demo1/`, `demo2/`, ... (things built during lecture) and sometimes `lab1/`, `lab2/`, ... (things students build). Early weeks are plain HTML/CSS/JS; week4 introduces TypeScript; week5 onward is Next.js, each demo folder its own self-contained app with its own `package.json`.

Later demos in a week usually refactor the earlier one — e.g. week6 goes `demo1` (no components) → `demo2` (components) → `demo3` (client state) on the same coffee cart, then `demo4` (filter a list as you type), `demo5` (a one-page form) → `demo6` (the same form as a three-card wizard), then `demo7` (the menu fetched from a server) → `demo8` (the same fetch behind an `x-auth` header). When changing one, check whether the sibling demos are meant to stay in sync or to deliberately differ, since the difference between them *is* the lesson.

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

## Conventions

- **New projects are Next.js + TypeScript** unless a lesson specifically calls for something else. Copy `next.config.ts`, `tsconfig.json`, and `.gitignore` from the most recent week's demo so the setup is identical every time.
- Plain `globals.css` with plain class names. No Tailwind, no CSS modules, no styled-components.
- Props are typed inline in the function signature. Shared shapes go in a `types/` file only when more than one component needs them.
- Comments explain *why this is the teaching point*, not what the line does.
