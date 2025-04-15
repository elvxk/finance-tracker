"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  // Mendapatkan tahun dan bulan saat ini
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // State untuk bulan & tahun yang dipilih
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Pastikan `selectedMonth` hanya diatur di client
  useEffect(() => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  }, []);

  // Filter transaksi berdasarkan bulan dan tahun yang dipilih
  const filteredTransactions = data.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() + 1 === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
    );
  });

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
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="monthPicker">Select Month:</label>
        <Select
          id="monthPicker"
          value={selectedMonth}
          onValueChange={(value) => setSelectedMonth(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {selectedMonth
                ? new Date(2000, selectedMonth - 1).toLocaleString("default", {
                    month: "long",
                  })
                : "Select a Month"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[...Array(12)].map((_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {new Date(2000, i).toLocaleString("default", { month: "long" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label htmlFor="yearPicker">Select Year:</label>
        <Select
          id="yearPicker"
          value={selectedYear ? String(selectedYear) : ""}
          onValueChange={(value) => setSelectedYear(Number(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue>{selectedYear || "Select a Year"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[...Array(5)].map((_, i) => (
              <SelectItem key={i} value={String(currentYear - i)}>
                {currentYear - i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{formatRupiah(transaction.amount)}</TableCell>
              <TableCell>
                {transaction.isIncome ? (
                  <Badge className="bg-green-500 text-white">Income</Badge>
                ) : (
                  <Badge className="bg-red-500 text-white">Expense</Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.category?.name || "N/A"}</TableCell>
              <TableCell>{transaction.bankAccount?.name || "N/A"}</TableCell>
              {/* Tampilkan nama bank */}
              <TableCell>{formatRupiah(transaction.currentBalance)}</TableCell>
              {/* Format angka ke Rupiah */}
              {/* <TableCell> */}
              {/*   <Button */}
              {/*     variant="destructive" */}
              {/*     onClick={() => handleDelete(transaction.id)} */}
              {/*   > */}
              {/*     Delete */}
              {/*   </Button> */}
              {/* </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
