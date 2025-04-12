import AddBankBtn from "@/components/addbank-btn";
import BankAccount from "@/components/tracker/bankAccount";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const Account = async () => {
  const user = await currentUser();
  const accounts = await prisma.bankAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
  });
  const sanitizedAccounts = accounts.map((account) => ({
    ...account,
    balance: account.balance.toNumber(), // Konversi balance ke number
  }));

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <AddBankBtn userid={user.id} />
      <BankAccount data={sanitizedAccounts} />
    </div>
  );
};

export default Account;
