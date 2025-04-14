"use client";

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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentAdd = ({ categories, bankAccounts, user }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dialog
  const [transactionName, setTransactionName] = useState(""); // State untuk nama transaksi
  const [amount, setAmount] = useState(""); // State untuk jumlah transaksi
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori
  const [selectedBankAccount, setSelectedBankAccount] = useState(""); // State untuk akun bank
  const [date, setDate] = useState(""); // State untuk tanggal transaksi
  const [transactionType, setTransactionType] = useState(""); // State untuk tipe transaksi (income/expense)
  const router = useRouter(); // Router untuk refresh halaman

  const handleSaveTransaction = async () => {
    if (
      !transactionName ||
      !amount ||
      !selectedCategory ||
      !selectedBankAccount ||
      !date ||
      !transactionType
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: transactionName, // Nama transaksi
          amount: parseFloat(amount), // Jumlah transaksi
          category: selectedCategory, // Kategori transaksi
          bankAccount: selectedBankAccount, // Akun bank transaksi
          date: new Date(date), // Konversi tanggal ke format Date
          isIncome: transactionType === "income", // Tipe transaksi (true jika income, false jika expense)
          userId: user, // Sesuaikan dengan ID user aktual
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction. Please try again.");
    } finally {
      // Reset state dan refresh router
      setTransactionName("");
      setAmount("");
      setSelectedCategory("");
      setSelectedBankAccount("");
      setDate("");
      setTransactionType("");
      setIsOpen(false); // Tutup dialog
      router.refresh(); // Refresh halaman
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Transaction</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Transaction Name"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Transaction Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedBankAccount(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Bank Account" />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            placeholder="Transaction Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Select onValueChange={(value) => setTransactionType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSaveTransaction}
            disabled={
              !transactionName ||
              !amount ||
              !selectedCategory ||
              !selectedBankAccount ||
              !date ||
              !transactionType
            }
          >
            Save Transaction
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentAdd;
