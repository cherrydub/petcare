import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormBtn({ actionType }: { actionType: string }) {
  const { pending } = useFormStatus();

  let buttonText;

  if (pending) {
    buttonText = actionType === "add" ? "Adding..." : "Updating...";
  } else {
    buttonText = actionType === "add" ? "Add pet" : "Edit pet";
  }

  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {buttonText}
    </Button>
  );
}
