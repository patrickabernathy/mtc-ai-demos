// The Corner Store — untyped.
// This is where we left off after Wednesday.
// Nothing tells us what kind of value goes where.

let cart = [];

function addItem(name, price, qty) {
  cart.push({ name: name, price: price, qty: qty });
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].qty;
  }
  return total;
}

function printCart() {
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].name + ': $' + (cart[i].price * cart[i].qty).toFixed(2));
  }
}

// Works fine:
addItem('Coffee', 4.5, 2);
addItem('Muffin', 3.0, 1);
console.log('Total:', getTotal());
printCart();

// Also "fine" — JavaScript says nothing:
addItem('Tea', '2.50', 1);       // price is a string, not a number
addItem('Scone', 1.75, 'two');   // qty is a string — getTotal() will return NaN
console.log('Total with bad data:', getTotal());
