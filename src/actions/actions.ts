"use server";

import prisma from "@/lib/db";
import { PetInternal } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {
  await sleep(2500);

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { message: "Invalid pet data" };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(2500);

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return { message: "Invalid pet data" };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Could not edit pet" };
  }
  //revalidating layout within app because this is where it fetches all the pets data
  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: unknown) {
  await sleep(2500);

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return { message: "Invalid pet data" };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    console.log(error);

    return { message: "Could not checkout pet" };
  }
  revalidatePath("/app", "layout");
}
