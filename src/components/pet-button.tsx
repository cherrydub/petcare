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
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  pendingText?: string;
};

export default function PetButton({
  actionType,
  children,
  disabled = false,
  onClick,
  pendingText,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  if (actionType === "checkout") {
    return (
      <Button disabled={disabled} onClick={onClick} variant={"secondary"}>
        {disabled ? pendingText : children || "Checkout"}
        {/* {children || "Checkout"} */}
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
              flushSync(() => {
                setIsFormOpen(false);
              });
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
