"use client";

import React, { createContext, useState } from "react";

export const PetContext = createContext(null);

export default function PetContextProvider({ data, children }) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <PetContext.Provider
      value={{ pets, setPets, selectedPetId, setSelectedPetId }}
    >
      {children}
    </PetContext.Provider>
  );
}
