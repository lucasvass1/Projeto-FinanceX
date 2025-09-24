import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "../(home)/_components/sumary-cards";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import TimeSelect from "./_components/time-select";
import LastTransactions from "./_components/last-transactions";

interface HomeProps { 
  searchParams: { month?: string };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  // Verifica autenticação
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    redirect("/login");
  }

  // Valida o mês
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/?month=01`); // caminho absoluto
  }

  // Busca dados do dashboard
  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Início</h1>
          <TimeSelect />
        </div>

        {/* Layout de grid */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="flex flex-col gap-6">
            {/* Cards de resumo */}
          <SummaryCards month={month} {...dashboard} />

            {/* Gráfico de transações */}
            <div className="grid grid-cols-3 grid-rows-1 gap-6 ">

            <TransactionsPieChart typesPercentage={dashboard.typePercentage} {...dashboard} />
            <ExpensesPerCategory expensesPerCategory={dashboard.totalExpensesPerCategory} />
          </div>
        </div>
        <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
