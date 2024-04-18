import Image from "next/image";
import React from "react";

export default function PetList() {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      <li>
        <button
          className="flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3
        hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition"
        >
          <Image
            src={
              "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
            }
            alt="Dog"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <p className="font-semibold">Benjamin</p>
        </button>
      </li>
      <li>
        <button
          className="flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3
        hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition"
        >
          <Image
            src={
              "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
            }
            alt="Dog"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <p className="font-semibold">Stella</p>
        </button>
      </li>
    </ul>
  );
}
