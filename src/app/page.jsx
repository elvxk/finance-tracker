import BankAccount from "@/components/tracker/bankAccount";
import PaymentAdd from "@/components/tracker/payment/paymentAdd";
import PaymentTable from "@/components/tracker/payment/paymentTable";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser(); // Ambil data user dari Clerk

  // Ambil data akun bank milik user
  const accounts = await prisma.bankAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
  });

  // Sanitisasi data akun bank (konversi Decimal ke number)
  const sanitizedAccounts = accounts.map((account) => ({
    ...account,
    balance: account.balance.toNumber(), // Konversi balance ke number
  }));

  // Ambil data kategori milik user
  const category = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
  });

  // Ambil data transaksi milik user
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
    include: {
      category: true, // Sertakan relasi ke tabel Category
      bankAccount: true, // Sertakan relasi ke tabel BankAccount
    },
  });

  // Sanitisasi data transaksi (konversi Decimal ke number)
  const sanitizedTransactions = transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber(), // Konversi Decimal ke Number
    currentBalance: transaction.currentBalance.toNumber(), // Konversi Decimal ke Number
    category: transaction.category ? { name: transaction.category.name } : null, // Sertakan nama kategori jika ada
    bankAccount: transaction.bankAccount
      ? { name: transaction.bankAccount.name }
      : null, // Sertakan nama bank jika ada
  }));

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4 lg:gap-6">
          {/* Kirim data akun bank ke komponen BankAccount */}
          <BankAccount data={sanitizedAccounts} />

          {/* Kirim data kategori dan akun bank ke PaymentAdd */}
          <PaymentAdd
            categories={category}
            bankAccounts={sanitizedAccounts}
            user={user.id}
          />

          {/* Kirim data transaksi yang telah disanitasi ke PaymentTable */}
          <PaymentTable data={sanitizedTransactions} />
        </div>
      </div>
    </>
  );
}
