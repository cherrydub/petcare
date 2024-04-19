import React from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function PetForm() {
  return (
    <form action="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" type="text" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" type="text" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input id="age" type="number" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" rows={3} />
      </div>
    </form>
  );
}
