# Week 8, demo 3 — Props, properly

The deliberate re-teach. Two things about props that are worth breaking rather than being told, and
then the difference between a component that takes a list of props and one that takes a box.

Small on purpose — it exists to make two specific ideas visible, not to be an app.

## How to run it

```
cd week8/demo3
npm install
npm run dev
```

Open <http://localhost:3000>.

## What to do

**1. Change a prop and watch nothing happen.** `Greeting` is handed a `name` and immediately assigns
a different one:

```tsx
export function Greeting({ name }: { name: string }) {
  name = "Changed!";
  return <h2>Hello {name}</h2>;
}
```

The heading says "Hello Changed!". The parent's `person` is untouched, and there is no error — the
assignment worked fine, it just did not do what it looked like it did.

**A prop is a copy of what you were given, not a wire back to whoever gave it.** The child scribbled
on its own copy. The parent has no idea and never will. This is the most common wrong idea about
props there is: people imagine a shared connection between parent and child. It is a one-way
handover, and it happens fresh every time the component runs.

**2. So how does a child change anything?** It is handed a way to *ask*:

```tsx
<Greeting name={person} onRename={setPerson} />
```

Values go down. Messages come back up. Every `onAdd`, `onRemove` and `onChange` you have written
since the cart is exactly this shape.

**3. Break it with the wrong type.** Try handing `Greeting` an object instead of a string:

```tsx
<Greeting name={{ first: "Sam", last: "Ali" }} />
```

It never runs. The editor underlines it in red before you save, before the browser is involved at
all. That is probably the first time this term the types have visibly saved you — worth noticing,
because it is the whole reason for writing them. Without it you would get a page showing
`[object Object]`, or a crash three files from the actual mistake.

**4. Twelve props, or a box.** Compare `states/02-card-props` with `states/03-card-children`. The
first describes its contents through nine props and a pile of `if`s; the second is a frame that
holds whatever you put inside it.

The practical signal is your third `showSomething` prop. At that point the component has stopped
deciding anything and started taking instructions — hand it a box instead.

## The teaching point

Props are a one-way copy. That single fact explains why assigning to one does nothing, why you need
callback props to change anything, and why passing a value through four components that do not use
it is a smell rather than a style.

And the composition question is not a rule, it is a question: **is this component deciding what is
inside, or just how it looks?** Deciding — props. A frame — `children`.

## The `states/` folder

Reference only.

| State | What it shows |
|---|---|
| `01-messages-up` | The callback prop fix — data down, messages up |
| `02-card-props` | A card described through nine props |
| `03-card-children` | The same card as a frame, using `children` |
