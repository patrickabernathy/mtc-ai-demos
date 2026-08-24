# TypeScript demos

The TypeScript examples from class, built around the same corner-store cart
from earlier weeks.

## First: install

Run this once in this folder, before anything else:

```
npm install
```

Skip this and `tsc` won't behave — you'll get confusing errors that have
nothing to do with the code.

## The three files

**`store-plain.js`** — where we left off in plain JavaScript. Nothing checks
what kind of value goes where, so bad data (a price that's a string, a
quantity that's a string) slides right through.

```
node store-plain.js
```

**`store-typed.ts`** — the same cart, fully typed. Run it in two steps: first
compile it, then run the plain JavaScript that comes out.

```
npx tsc --target ES2020 --module ES2020 store-typed.ts && node store-typed.js
```

**`broken.ts`** — spot the bug. Four type errors are planted in this file on
purpose. Don't fix them — run the compiler and read what it tells you.

```
npx tsc --noEmit broken.ts
```

`--noEmit` means "just check the types, don't produce a `.js` file" — there's
nothing to run here, only errors to read.
