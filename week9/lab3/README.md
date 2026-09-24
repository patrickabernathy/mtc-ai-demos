# lab3 — give the site a phone view

A one-page site for The Daily Grind: header and nav, a hero, three feature cards, hours and location, a birthday-list signup, and a footer. It was designed on a laptop and only on a laptop — every class in it describes the wide screen. Nobody has designed what a phone should get.

## How to run it

```
npm install
npm run dev
```

Then open http://localhost:3000. Open DevTools, turn on the device toolbar (`Ctrl+Shift+M`, `Cmd+Shift+M` on a Mac), and set the width to 375 to see what a phone gets today.

## What to do

Add the phone view, one section at a time: decide what each section should look like on a 375-pixel screen, write that with no prefix, and move the laptop version behind `md:`. The last section is the header, where the nav folds into a Menu button on a phone. Full step-by-step guide, with checkpoints and hints, in `instructions.html` (open it in a browser).

## The teaching point

A class with no prefix applies on every screen, phones included; `md:` means "from 768px up." So the phone version is the default, written plainly, and the laptop version is the upgrade. Adding a phone view to a laptop-only site is mostly one move repeated: take a class that only makes sense on a wide screen, put `md:` in front of it, and write what the phone gets instead.
