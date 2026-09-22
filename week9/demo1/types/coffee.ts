export type MenuItem = {
  id: number;
  name: string;
  price: number;
};

export type CartLine = {
  name: string;
  qty: number;
  price: number;
};

export const menu: MenuItem[] = [
  { id: 1, name: "Espresso", price: 2.5 },
  { id: 2, name: "Latte", price: 4.0 },
  { id: 3, name: "Cappuccino", price: 4.0 },
  { id: 4, name: "Mocha", price: 4.5 },
  { id: 5, name: "Cold Brew", price: 3.75 },
  { id: 6, name: "Seasonal oat-milk pumpkin spice", price: 5.25 },
];
