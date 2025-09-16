import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { Transactioncolumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // ✅ import correto

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
      <div className="space-y-6 p-6">
        {/* Cabeçalho com título e botão na mesma linha */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        {/* Tabela de transações abaixo */}
        <DataTable columns={Transactioncolumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
