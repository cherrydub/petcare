"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  if (actionType === "checkout") {
    return (
      <Button onClick={onClick} variant={"secondary"}>
        {children || "Checkout"}
      </Button>
    );
  }

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size={"icon"}>
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant={"secondary"}>{children || "Edit"}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add Pet" : "Edit Pet"}
            </DialogTitle>
          </DialogHeader>

          <PetForm
            actionType={actionType}
            onFormSubmission={() => {
              setIsFormOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
