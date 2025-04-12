import BankAccount from "@/components/tracker/bankAccount";

export default function Home() {
  const account = [
    { name: "Cash", ammount: 120000 },
    { name: "BNI", ammount: 4500000 },
    { name: "Mandiri", ammount: 3833000 },
    { name: "Mandiri", ammount: 3833000 },
    { name: "Mandiri", ammount: 3833000 },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          Hello
          {/* <BankAccount data={account} /> */}
        </div>
      </div>
    </>
  );
}
