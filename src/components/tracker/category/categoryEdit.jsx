"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CategoryEdit = ({ data }) => {
  const [name, setName] = useState(data.name || "");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!name) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/category", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      toast.success("Category update successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category. Please try again.");
    } finally {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hover:cursor-pointer text-sm opacity-75  hover:underline">
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit{" " + data.name}</DialogTitle>
          <DialogDescription>
            Fill in the details below to edit category.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Category Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!name}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryEdit;
