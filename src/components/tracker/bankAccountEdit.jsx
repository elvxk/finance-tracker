import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import BankAccountDel from "./bankAccountDel";

const BankAccountEdit = ({ children, account }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dialog
  const [name, setName] = useState(account.name || ""); // State untuk nama dengan nilai awal
  const [balance, setBalance] = useState(account.balance || ""); // State untuk balance dengan nilai awal
  const router = useRouter();

  // Reset state saat dialog dibuka
  const handleDialogOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      setName(account.name || ""); // Set nilai awal dari account
      setBalance(account.balance || ""); // Set nilai awal dari account
    }
  };

  const handleSave = async () => {
    if (!name || !balance) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: account.id,
          name,
          balance: parseFloat(balance),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bank account");
      }

      toast.success("Bank account update successfully!");
      setIsOpen(false); // Tutup dialog setelah berhasil menyimpan
      router.refresh(); // Refresh halaman
    } catch (error) {
      console.error(error);
      toast.error("Failed to update bank account. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger className="hover:cursor-pointer text-sm opacity-75 -mt-2 hover:underline">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>Edit your current account</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Bank Account Name"
            value={name} // Gunakan state lokal untuk kontrol
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Balance"
            value={balance} // Gunakan state lokal untuk kontrol
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <BankAccountDel account={account}>remove</BankAccountDel>
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

export default BankAccountEdit;
