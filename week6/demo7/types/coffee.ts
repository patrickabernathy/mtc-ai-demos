export type MenuItem = {
  name: string;
  price: number;
};

export type CartLine = {
  name: string;
  qty: number;
  price: number;
};

// Still here on purpose. Tonight the menu stops coming from this file and
// starts coming from a server. Keeping it means we can compare the two, and
// it is the fallback if the network is having a bad night.
export const menu: MenuItem[] = [
  { name: "Espresso", price: 2.5 },
  { name: "Latte", price: 4.0 },
  { name: "Cappuccino", price: 4.0 },
  { name: "Mocha", price: 4.5 },
  { name: "Cold Brew", price: 3.75 },
];
