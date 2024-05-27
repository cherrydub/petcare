"use server";

import prisma from "@/lib/db";
import { Pet } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData) {
  await sleep(2500);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: +formData.get("age"),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId, formData) {
  await sleep(2500);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: +formData.get("age"),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return { message: "Could not edit pet" };
  }
  //revalidating layout within app because this is where it fetches all the pets data
  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId) {
  await sleep(2500);

  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    console.log(error);

    return { message: "Could not checkout pet" };
  }
  revalidatePath("/app", "layout");
}
