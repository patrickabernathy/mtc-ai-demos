// What anyone can see about a pet: the home page shows these.
export type Pet = {
  id: number;
  name: string;
  species: string;
  age: number;
  about: string;
};

// Everything about a pet, including the private part.
// Only the pet's owner should ever get one of these.
export type PetRecord = Pet & {
  ownerEmail: string | null;
  adoptedOn: string | null;
  microchip: string | null;
  vetNotes: string | null;
};
