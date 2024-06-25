import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <Image
        className={cn("", className)}
        src="/logo.svg"
        width={33}
        height={33}
        alt="logo"
      />
    </Link>
  );
}
