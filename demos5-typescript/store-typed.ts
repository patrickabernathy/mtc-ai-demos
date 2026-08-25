// The Corner Store — typed version.
// Run: npx tsc --target ES2020 --module ES2020 store-typed.ts && node store-typed.js
// (ts-node isn't set up for this class — compile with tsc, then run the
// plain-JS output. The --target/--module flags matter: this folder's
// package.json sets "type": "module" to match them. Compiling without the
// flags emits CommonJS, which then crashes at run time with
// "exports is not defined in ES module scope".)

// `export {}` makes this a module instead of a global script — see the
// matching comment in broken.ts for why that matters when both files sit
// in the same folder.


// ---- step 1: name the shape ----

export type CartItem = {
  name: string;
  price: number;
  qty: number;
};

// ---- step 2: use it ----

let cart: CartItem[] = [];

export function addItem(name: string, price: number, qty: number): void {
  cart.push({ name, price, qty });
}

function getTotal(): number {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].qty;
  }
  return total;
}

function printCart(): void {
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].name + ': $' + (cart[i].price * cart[i].qty).toFixed(2));
  }
}

// ---- works as before ----

addItem('Coffee', 4.5, 2);
addItem('Muffin', 3.0, 1);
console.log('Total:', getTotal());
printCart();

// ---- these are now compile errors -- uncomment one at a time to demo ----

// addItem('Tea', '2.50', 1);          // Argument of type 'string' is not assignable to parameter of type 'number'.
// addItem('Scone', 1.75, 'two');      // Same.
// let bad: CartItem = { name: 'x', price: 1.0 };  // Property 'qty' is missing in type '{ name: string; price: number; }' but required in type 'CartItem'.
