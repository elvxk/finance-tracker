"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Wallet } from "lucide-react";
import BankAccountEdit from "./bankAccountEdit";

const BankAccount = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
      {data.map((account, index) => {
        return (
          <Card key={index} className="@container/card">
            <CardHeader className="relative">
              <CardDescription className="text-black dark:text-white font-bold flex items-center">
                <Wallet className="scale-68" />
                {account.name}
              </CardDescription>
              <CardTitle className="@[254px]/card:text-2xl text-xl font-semibold tabular-nums">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(account.balance)}
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <BankAccountEdit account={account}>Edit</BankAccountEdit>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default BankAccount;
