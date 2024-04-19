"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";
import React from "react";
import PetButton from "./pet-button";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-ful">
      {!selectedPet ? (
        <div className="h-full flex justify-center items-center">
          <EmptyView />
        </div>
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: Pet;
};

function TopBar({ pet }: Props) {
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet?.imageUrl}
        alt="Dog"
        width={75}
        height={75}
        className="rounded-full object-cover w-[75px] h-[75px]"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
      <div className="flex ml-auto space-x-2">
        <PetButton actionType="edit">Edit Pet</PetButton>
        <PetButton actionType="checkout" />
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around text-center py-10 px-5 ">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {pet?.notes}
    </section>
  );
}

function EmptyView() {
  return <p className="text-2xl font-medium">No pet selected</p>;
}
