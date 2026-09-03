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
  { name: "Croissant", price: 3.25 },
  { name: "Cinnamon Roll", price: 4.5 },
  { name: "Sourdough Loaf", price: 6.0 },
  { name: "Blueberry Muffin", price: 3.75 },
  { name: "Baguette", price: 4.25 },
];
