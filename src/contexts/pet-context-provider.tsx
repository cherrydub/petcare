"use client";

import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

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
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //event handlers / actions
  async function handleAddPet(newPet: Omit<Pet, "id">) {
    // const dateId = Date.now().toString();
    // setPets((prev) => [...prev, { id: dateId, ...newPet }]);
    // setSelectedPetId(dateId);
    await addPet(newPet);
  }

  function handleEditPet(petId: string, updatedPet: Omit<Pet, "id">) {
    const newPets = pets.map((pet) => {
      if (pet.id === petId) {
        return { id: petId, ...updatedPet };
      }
      return pet;
    });
    setPets(newPets);
  }

  function handleChangeSelectedPetId(id: string) {
    setSelectedPetId(id);
  }

  function handleCheckoutPet(id: string) {
    const newPets = pets.filter((pet) => pet.id !== id);
    setPets(newPets);
    setSelectedPetId(null);
  }

  function updatePet(updatedPet: Pet) {
    const newPets = pets.map((pet) => {
      if (pet.id === updatedPet.id) {
        return updatedPet;
      }
      return pet;
    });
    setPets(newPets);
  }

  return (
    <PetContext.Provider
      value={{
        pets,
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
