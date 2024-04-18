"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="h-full w-ful">
      <div className="flex items-center bg-white px-8 py-5 border-b border-black/[0.08]">
        <Image
          src={selectedPet?.imageUrl}
          alt="Dog"
          width={75}
          height={75}
          className="rounded-full object-cover w-[75px] h-[75px]"
        />
        <h2 className="text-3xl font-semibold leading-7 ml-5">
          {selectedPet?.name}
        </h2>
      </div>
    </section>
  );
}
