import { Pet } from "@prisma/client";

export type PetInternal = Omit<Pet, "id" | "createdAt" | "updatedAt">;

// export type Pet = {
//   id: string;
//   name: string;
//   ownerName: string;
//   imageUrl: string;
//   age: number;
//   notes: string;
// };
