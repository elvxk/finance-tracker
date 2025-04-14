"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Komponen Table dari shadcn/ui
import { Button } from "@/components/ui/button"; // Tombol dari shadcn/ui
import { Badge } from "@/components/ui/badge"; // Komponen Badge dari shadcn/ui
import { toast } from "sonner"; // Komponen toast untuk notifikasi (opsional)

// Format angka ke Rupiah tanpa desimal
const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const PaymentTable = ({ data }) => {
  const [transactions, setTransactions] = useState(data); // State untuk menyimpan transaksi

  // Fungsi untuk menghapus transaksi
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/transaction`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      // Filter transaksi yang tersisa setelah penghapusan
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      );
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Current Balance</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{formatRupiah(transaction.amount)}</TableCell>{" "}
              {/* Format angka ke Rupiah */}
              <TableCell>
                {transaction.isIncome ? (
                  <Badge className="bg-green-500 text-white">Income</Badge>
                ) : (
                  <Badge className="bg-red-500 text-white">Expense</Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}{" "}
                {/* Format tanggal */}
              </TableCell>
              <TableCell>{transaction.category?.name || "N/A"}</TableCell>{" "}
              {/* Tampilkan kategori */}
              <TableCell>
                {transaction.bankAccount?.name || "N/A"}
              </TableCell>{" "}
              {/* Tampilkan nama bank */}
              <TableCell>
                {formatRupiah(transaction.currentBalance)}
              </TableCell>{" "}
              {/* Format angka ke Rupiah */}
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
