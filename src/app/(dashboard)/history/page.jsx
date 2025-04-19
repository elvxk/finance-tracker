import PaymentTable from "@/components/tracker/payment/paymentTable";
import prisma from "@/lib/prisma";
import { sanitizeForClient } from "@/lib/sanitizeForClient";
import { auth } from "@clerk/nextjs/server";

const History = async () => {
  const { userId } = await auth();

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
    <div className="flex flex-col gap-4 lg:gap-6">
      <PaymentTable data={transactions} />
    </div>
  );
};
export default History;
