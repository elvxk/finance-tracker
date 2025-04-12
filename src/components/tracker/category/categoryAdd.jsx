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

const CategoryAdd = ({ user }) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!name) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userId: user,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      toast.success("Category added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category. Please try again.");
    } finally {
      setName("");
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new category.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Category Name"
            value={name}
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
export default CategoryAdd;
