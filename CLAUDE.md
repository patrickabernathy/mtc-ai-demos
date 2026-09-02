# CLAUDE.md

Teaching repo for the MTC AI-Enabled Full-Stack Developer program. Everything here is demo and lab code written live in front of a class — it is instructional material, not a product. Optimize for readability and for matching what was taught that week, not for cleverness.

## Layout

Code is organized by session: `week1/` through `week6/`, each containing `demo1/`, `demo2/`, ... (things built during lecture) and sometimes `lab1/`, `lab2/`, ... (things students build). Early weeks are plain HTML/CSS/JS; week4 introduces TypeScript; week5 and week6 are Next.js apps, each demo folder its own self-contained app with its own `package.json`.

Later demos in a week usually refactor the earlier one — e.g. week6 goes `demo1` (no components) → `demo2` (components) → `demo3` (client state) on the same coffee cart. When changing one, check whether the sibling demos are meant to stay in sync or to deliberately differ, since the difference between them *is* the lesson.

## Branches

- **`main`** — the starting point students receive. It holds the demo code as it stands when class begins, before the exercise is worked. Keep it at the "before" state.
- **`answers`** — the answer key. The completed version of whatever the current demo asks students to build. Class runs the demo against `main`; `answers` is what it should look like when finished.
- **`demo-YYYYMMDD`** — a snapshot of what was actually typed during a specific live session. Historical record, not maintained.

Do not merge `answers` into `main` — that would hand students the solution. When a new exercise starts, `main` moves forward to the new starting point and `answers` is rebuilt on top of it.

## Conventions

- No build tooling beyond what a week's lesson has already introduced. If week3 hasn't covered npm, week3 demos don't get a `package.json`.
- Prefer the obvious construct over the idiomatic-but-advanced one. Students have to read this cold.
- Comments explain *why this is the teaching point*, not what the line does.
