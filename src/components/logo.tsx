import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.svg" width={33} height={33} alt="logo" />
    </Link>
  );
}
