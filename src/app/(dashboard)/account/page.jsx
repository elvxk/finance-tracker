import AddBankBtn from "@/components/addbank-btn";
import BankAccount from "@/components/tracker/bankAccount";
import prisma from "@/lib/prisma";
import { sanitizeForClient } from "@/lib/sanitizeForClient";
import { auth } from "@clerk/nextjs/server";

const Account = async () => {
  const { userId } = await auth();
  const accountsRaw = await prisma.bankAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
  });
  const accounts = sanitizeForClient(accountsRaw);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <AddBankBtn userid={userId} />
      <BankAccount data={accounts} />
    </div>
  );
};

export default Account;
