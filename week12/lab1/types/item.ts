// One row of the items table, the way the pages want it.
// This is a promise about what /api/coffees sends back. Nothing checks it.
export type Item = {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
};
