import BankAccount from "@/components/tracker/bankAccount";
import PaymentAdd from "@/components/tracker/payment/paymentAdd";
import PaymentTable from "@/components/tracker/payment/paymentTable";
import prisma from "@/lib/prisma";
import { sanitizeForClient } from "@/lib/sanitizeForClient";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  const accountsRaw = await prisma.bankAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
  });
  const accounts = sanitizeForClient(accountsRaw);

  const category = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
  });

  const transactionsRaw = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
    include: {
      category: true,
      bankAccount: true,
    },
  });

  const transactions = sanitizeForClient(transactionsRaw);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 lg:gap-6">
        <BankAccount data={accounts} />

        <PaymentAdd
          categories={category}
          bankAccounts={accounts}
          user={userId}
        />

        <PaymentTable data={transactions} />
      </div>
    </div>
  );
}
