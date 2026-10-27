// One row of the items table, the way the page wants it.
// This is a promise about what /api/items sends back. Nothing checks it.
export type Item = {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
};
