export type MenuItem = {
  name: string;
  price: number;
};

export type CartLine = {
  name: string;
  qty: number;
  price: number;
};

export const menu: MenuItem[] = [
  { name: "Espresso", price: 2.5 },
  { name: "Latte", price: 4.0 },
  { name: "Cappuccino", price: 4.0 },
  { name: "Mocha", price: 4.5 },
  { name: "Cold Brew", price: 3.75 },
];
