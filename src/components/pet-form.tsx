"use client";

import React from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";
import { PetInternal } from "@/lib/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  imageUrl: z
    .string()
    .trim()
    .url({ message: "Must be a valid image url" })
    .optional(),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .int()
    .positive()
    .max(99),
  notes: z.string().trim().max(1000).optional(),
});

// now i can clone from the zod schema what i expect and can use that elsewhere
type TPetForm = z.infer<typeof petFormSchema>;

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  // function handleAddPet(formData: FormData) {
  //   throw new Error("Function not implemented.");
  // }

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const newPet = {
  //     name: formData.get("name") as string,
  //     ownerName: formData.get("ownerName") as string,
  //     imageUrl:
  //       (formData.get("imageUrl") as string) ||
  //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //     age: +(formData.get("age") as string),
  //     notes: formData.get("notes") as string,
  //   };
  //   // adds pet, this function is in the context
  //   if (actionType === "edit") {
  //     handleEditPet(selectedPet!.id, newPet);
  //   } else {
  //     handleAddPet(newPet);
  //   }

  //   // this function is passed in as a prop which allows the form to be closed after submission
  //   onFormSubmission();
  // }

  const {
    register,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: +(formData.get("age") as string),
          notes: formData.get("notes") as string,
        };

        if (actionType === "edit") {
          // const error = await editPet(selectedPet!.id, formData);
          // if (error) {
          //   toast.warning(error.message);
          //   return;
          // }
          await handleEditPet(selectedPet!.id, petData);
        }
        if (actionType === "add") {
          // const error = await addPet(formData);
          // if (error) {
          //   toast.warning(error.message);
          //   return;
          // }
          await handleAddPet(petData);
        }
      }}
      className="flex flex-col "
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            // name="name"
            // type="text"
            // required
            // defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} rows={3} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
