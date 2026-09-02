export type Drink = {
  name: string;
  category: string;
  price: number;
};

// Fourteen rows on purpose. Filtering a list of three is a party trick;
// filtering a list you would actually have to scroll is the real use case.
export const drinks: Drink[] = [
  { name: "Espresso", category: "Espresso", price: 2.5 },
  { name: "Doppio", category: "Espresso", price: 3.0 },
  { name: "Macchiato", category: "Espresso", price: 3.25 },
  { name: "Latte", category: "Espresso", price: 4.0 },
  { name: "Cappuccino", category: "Espresso", price: 4.0 },
  { name: "Flat White", category: "Espresso", price: 4.25 },
  { name: "Mocha", category: "Espresso", price: 4.5 },
  { name: "House Drip", category: "Brewed", price: 2.25 },
  { name: "Pour Over", category: "Brewed", price: 3.5 },
  { name: "Cold Brew", category: "Cold", price: 3.75 },
  { name: "Iced Latte", category: "Cold", price: 4.25 },
  { name: "Earl Grey", category: "Tea", price: 2.75 },
  { name: "Green Tea", category: "Tea", price: 2.75 },
  { name: "Chai Latte", category: "Tea", price: 4.0 },
];
