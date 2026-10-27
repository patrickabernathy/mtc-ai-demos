# CLAUDE.md

## Project Overview

`week7/demo1` of the MTC AI-Enabled Full-Stack Developer teaching repo. It is an
untouched `create-next-app` scaffold, and that is the point: the lesson is the
**AI-assisted development workflow** — requirements → design → plan → build with
Claude Code — not the app itself. The app gets built live in front of the class,
starting from the generator's default page.

The repo-root `CLAUDE.md` also applies. Read it for the repo-wide rules; this
file only adds what is specific to this demo.

## Tech Stack

Straight `create-next-app` output, deliberately unmodified:

- Next.js **16.4.3** (App Router), React **19.2.8** — both pinned exactly
- TypeScript 5, `strict: true`, `noEmit: true`
- Tailwind CSS **v4** via `@tailwindcss/postcss` (no `tailwind.config`, config
  lives in `globals.css` under `@theme inline`)
- Geist / Geist Mono from `next/font/google`
- `@/*` path alias → `./src/*`

## Project Structure

```
src/app/          the app — layout.tsx, page.tsx, globals.css, favicon.ico
public/            the generator's SVGs
docs/
  requirements.md  what we're building        (empty — filled in live)
  design.md        how it's put together      (empty — filled in live)
  plans/           one file per feature       (feature1.md, empty)
.claude/commands/  demo-local slash commands used during the session
```

## The docs/ folder is the demo

`docs/requirements.md`, `docs/design.md`, and `docs/plans/feature1.md` are
**intentionally empty on `main`**. They are written in class, in that order, with
Claude Code — requirements first, then a design from the requirements, then a
plan from the design, then code from the plan. Do not pre-fill them or
"helpfully" fill a gap; an empty doc means we have not reached that step yet.

When asked to write one, write only that one, and derive it from the doc before
it rather than from the code.

## Build and Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # the only real check — type-checks and builds
npm start
```

- `npm run build` is verification here. There is **no linter and no test suite**
  in this demo (`create-next-app` was run without ESLint, so there is no `lint`
  script) — don't add one.
- Only one demo in the repo can hold port 3000; stop any other `npm run dev`
  first.

## Coding Conventions

- Keep it beginners-class simple. This is week 7 of a class that met React in
  week 6 — no custom hooks, no context, no reducers, no extra libraries, no
  abstraction unless the lesson is about that abstraction.
- **Leave the scaffold a scaffold.** This demo is one of the two `create-next-app`
  demos in the repo (with `week5/demo2`) and exists to show what the generator
  hands you. Keep `src/app/`, keep the caret ranges, and keep **Tailwind** — the
  hand-built `week6` demos use plain CSS, but that is their convention, not one
  to impose here. Do not reconcile this demo toward them.
- Server Components by default; add `"use client"` only where interactivity
  actually needs it.
- Comments explain *why this is the teaching point*, not what the line does.

## Notes

- `layout.tsx` uses Next 16's globally-available `LayoutProps<"/">` type. There is
  no import for it; it comes from generated `.next` types, so it only resolves
  after a `dev` or `build` run.
- `README.md` is still the generator's boilerplate. Per the repo convention every
  demo gets a real README — replacing it is a live-session task, so expect it to
  be rewritten as part of the demo rather than treated as documentation now.
- Mind the branch: `main` is the "before" state students receive, `answers` is the
  finished version. Don't put the solution on `main`.
