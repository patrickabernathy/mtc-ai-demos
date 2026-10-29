// The ONE file that asks the database about pets.
// Routes call this; routes never write SQL themselves.
// Every value goes in as $1, never glued into the string: Wednesday's lesson.
import { NeonDatabaseProvider } from "../providers/neon/neonDatabaseProvider";
import type { Pet, PetRecord } from "../types/pet";

// The public columns, renamed to the camelCase the pages use.
const publicColumns = "id, name, species, age, about";

// The public columns plus the private ones.
const allColumns = `${publicColumns},
  owner_email AS "ownerEmail",
  to_char(adopted_on, 'YYYY-MM-DD') AS "adoptedOn",
  microchip,
  vet_notes AS "vetNotes"`;

export class PetService {
  private static instance: PetService;

  public static getInstance(): PetService {
    if (!PetService.instance) {
      PetService.instance = new PetService();
    }
    return PetService.instance;
  }

  private getPool() {
    return NeonDatabaseProvider.getInstance().getPool();
  }

  // Pets still waiting at the shelter. Public information only.
  public async getShelterPets(): Promise<Pet[]> {
    const result = await this.getPool().query(
      `SELECT ${publicColumns} FROM pets WHERE owner_email IS NULL ORDER BY id`
    );
    return result.rows;
  }

  // Every pet one person has adopted, private part included.
  public async getPetsOwnedBy(email: string): Promise<PetRecord[]> {
    const result = await this.getPool().query(
      `SELECT ${allColumns} FROM pets WHERE owner_email = $1 ORDER BY id`,
      [email]
    );
    return result.rows;
  }

  // One pet, private part included. Whoever calls this decides
  // whether the person asking is allowed to see it. This file doesn't.
  public async getPetRecord(id: number): Promise<PetRecord | undefined> {
    // "abc" or "1 OR 1=1" in the address turns into NaN. That's not a pet.
    if (!Number.isInteger(id)) {
      return undefined;
    }
    const result = await this.getPool().query(
      `SELECT ${allColumns} FROM pets WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
}
