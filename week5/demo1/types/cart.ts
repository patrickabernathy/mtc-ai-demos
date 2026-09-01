// The Corner Store — cart item type.
// Same shape as Tuesday's store-typed.ts (demos5-typescript), reused here
// for the React demo so the data model carries across both nights.

export type CartItem = {
  name: string;
  price: number;
  qty: number;
};

export const sampleCart: CartItem[] = [
  { name: "Coffee", price: 2.5, qty: 2 },
  { name: "Muffin", price: 3.0, qty: 1 },
  { name: "Milk", price: 4.25, qty: 1 },
];
