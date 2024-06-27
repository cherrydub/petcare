"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";
import { signOutAction } from "@/actions/actions";
import { toast } from "sonner";

export default function SignoutButton() {
  return (
    <Button
      onClick={async () => {
        await signOutAction();
        toast.info("Signed out");
      }}
    >
      Sign Out
    </Button>
  );
}
