// broken.ts — four type errors, on purpose.
// Run: npx tsc --noEmit broken.ts
// DO NOT FIX this before class — these are the demo bugs.

// `export {}` makes this a module instead of a global script. Without it,
// this file and store-typed.ts declare the same names (CartItem, addItem,
// getTotal) into one shared global scope whenever both sit in the same
// TypeScript project — which is exactly what happens the moment they're
// both open in the editor at once, or someone runs `tsc --noEmit` with no
// filename. That collision shows up as bogus "Duplicate identifier" and
// "Duplicate function implementation" errors that have nothing to do with
// the four planted bugs below. This line has no effect on those four bugs
// or their error messages — it only keeps this file's names out of
// store-typed.ts's way.
export {};

type CartItem = {
  name: string;
  price: number;
  qty: number;
};

function addItem(name: string, price: number, qty: number): void {
  console.log(name, price, qty);
}

function getTotal(items: CartItem[]): number {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].qty;
  }
  return total;
}

// Bug 1: price is a string, not a number
addItem('Coffee', '4.50', 2);

// Bug 2: qty is a string, not a number
addItem('Muffin', 3.0, 'one');

// Bug 3: missing the required qty field
let partialItem: CartItem = { name: 'Tea', price: 2.5 };

// Bug 4: function claims to return string, actually returns number
function discounted(price: number): string {
  return price * 0.9;
}
