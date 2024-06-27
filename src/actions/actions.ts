"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// ---- user actions ----
export async function logIn(formData: FormData) {
  console.log("authData", formData);
  const email = formData.get("email");
  const password = formData.get("password");
  //or
  const authData = Object.fromEntries(formData.entries());
  // await signIn("credentials", authData);
  //or
  //since we're using nextauth, we dont have to convert, we can just use formData

  await signIn("credentials", formData);
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);
  //first we signup with the hashed password
  await prisma.user.create({ data: { email, hashedPassword } });
  //then we login with the original non hashed password
  //we can use formdata instead of email and password since its same
  await signIn("credentials", formData);
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// ---- pet actions ----
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
