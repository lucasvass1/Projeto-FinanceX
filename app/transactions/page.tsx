import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { Transactioncolumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // ✅ import correto
import { ScrollArea } from "../_components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login'); 
  }

  const transactions = await db.transaction.findMany({
    where: { 
      userId,
    },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6 overflow-hidden">
        {/* Cabeçalho com título e botão na mesma linha */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        {/* Tabela de transações abaixo */}
        <ScrollArea>
          <DataTable columns={Transactioncolumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
