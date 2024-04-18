"use client";

import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();

  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => {
              handleChangeSelectedPetId(pet.id);
            }}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition",
              {
                "bg-[#eff1f2]": pet.id === selectedPetId,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Dog"
              width={45}
              height={45}
              className="rounded-full object-cover w-[45px] h-[45px]"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
