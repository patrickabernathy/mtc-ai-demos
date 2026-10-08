export type Pet = {
  id: number;
  name: string;
  species: string;
  age: number;
  adopted: boolean;
};

// The only species the shelter takes in. POST and PUT check against this list.
export const allowedSpecies = ["dog", "cat", "rabbit"];

// The shelter's animals. This array IS the server's data: GET reads it,
// POST pushes onto it, PUT changes a pet in it. It lives in memory, so
// restarting the server (or saving a route file) puts it back to this.
export const pets: Pet[] = [
  { id: 1, name: "Biscuit", species: "dog", age: 3, adopted: false },
  { id: 2, name: "Miso", species: "cat", age: 2, adopted: false },
  { id: 3, name: "Pepper", species: "rabbit", age: 1, adopted: false },
  { id: 4, name: "Duke", species: "dog", age: 7, adopted: true },
  { id: 5, name: "Clementine", species: "cat", age: 5, adopted: false },
  { id: 6, name: "Waffles", species: "dog", age: 1, adopted: false },
];
