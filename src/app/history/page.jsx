import PaymentTable from "@/components/tracker/payment/paymentTable";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const History = async () => {
  const user = await currentUser(); // Ambil data user dari Clerk

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
      <div className="flex flex-col gap-4 lg:gap-6">
        <PaymentTable data={sanitizedTransactions} />
      </div>
    </>
  );
};
export default History;
