"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-ful">
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

      <div className="flex justify-around text-center py-10 px-5 ">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Owner name
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Age
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
        </div>
      </div>
      <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-black/[0.08]">
        {selectedPet?.notes}
      </section>
    </section>
  );
}
