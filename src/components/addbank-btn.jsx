"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Import Sonner toast

const AddBankBtn = ({ userid }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dialog
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!name || !balance) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          balance: parseFloat(balance),
          userId: userid, // Ganti dengan ID user aktual
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add bank account");
      }

      toast.success("Bank account added successfully!");
      setName("");
      setBalance("");
      setIsOpen(false); // Tutup dialog setelah berhasil menyimpan
      router.refresh(); // Refresh halaman
    } catch (error) {
      console.error(error);
      toast.error("Failed to add bank account. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Bank Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Bank Account</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new bank account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Bank Account Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!name || !balance} // Disable tombol jika form kosong
          >
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBankBtn;
