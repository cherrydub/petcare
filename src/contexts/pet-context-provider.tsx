"use client";

import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, "id">) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [...state, newPet];
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  //event handlers / actions
  async function handleAddPet(newPet: Omit<Pet, "id">) {
    setOptimisticPets(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  async function handleEditPet(petId: string, updatedPet: Omit<Pet, "id">) {
    const error = await editPet(petId, updatedPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  function handleChangeSelectedPetId(id: string) {
    setSelectedPetId(id);
  }

  async function handleCheckoutPet(id: string) {
    // const newPets = data.filter((pet) => pet.id !== id);
    // setPets(newPets);

    setOptimisticPets((prev) => prev.filter((pet) => pet.id !== id));
    await checkoutPet(id);

    setSelectedPetId(null);
  }

  function updatePet(updatedPet: Pet) {
    const newPets = data.map((pet) => {
      if (pet.id === updatedPet.id) {
        return updatedPet;
      }
      return pet;
    });
    setOptimisticPets(newPets);
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
