# demo6 — the same form, as a three-card wizard

Identical questions to `demo5`, split across three cards: your info, pickup,
review. The difference is not cosmetic — one form owned its own state and could
keep it in one file. Three cards can't, and that is the entire lesson.

Right now all three cards are stacked on the page at once, the step tracker
always says step 1, the Review card shows four dashes, and no button does
anything.

## Install and run

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What to do

1. Make a `types/order.ts` with the shape all three cards agree on:

   ```ts
   export type Order = {
     name: string;
     email: string;
     phone: string;
     pickup: string;
   };
   ```

   Put `pickupTimes` (the five times) and an `emptyOrder` with four empty
   strings in there too.
2. In `app/page.tsx`, add `"use client"` and two pieces of state: `step`
   (starting at `1`) and `order` (starting at `emptyOrder`).
3. Show one card at a time: `{step === 1 && <ContactCard ... />}`, and so on.
4. Give `Steps` a `current` prop and let it decide which `<li>` gets the
   `active` class.
5. Give `ContactCard` and `PickupCard` two props: `order` coming down so the
   boxes can show what's already typed, and `onChange` so they can send a whole
   new order back up:

   ```tsx
   onChange={(event) => onChange({ ...order, name: event.target.value })}
   ```
6. Wire `onNext` and `onBack` to `setStep`. Have `ReviewCard` display the real
   `order` instead of the dashes, and **Place order** show a confirmation.
7. Optional: disable **Next** until that card's own fields are good. Each card
   checks its own two fields — nothing else needs to know the rules.

Test it by filling in step 1, going forward, then coming **back**. Your name
should still be there.

## The teaching point

**State lives above everyone who needs it.**

Three separate cards need the same four answers, so the answers cannot live in
any one card — they live in the parent, and each card is handed the piece it
needs. That's why going Back doesn't lose anything: the card never stored your
name, so unmounting it never threw your name away.

Then the part that trips everybody: a card can't just edit `order`, because it
doesn't own it. It copies it, changes one field, and hands the copy back up:

```tsx
onChange({ ...order, name: event.target.value })
```

Data down, changes up — the same rule as `demo2`, now carrying a whole object
instead of one number.

## Worth noticing

- **`ReviewCard` never met the other two cards.** It only got the finished
  order. That's the proof the data really did travel up to the parent.
- **`Steps` takes data and gives nothing back.** No buttons, so no callback.
  Not every component needs both directions.
- **The three cards are still one form.** Splitting a screen doesn't split the
  data behind it.
