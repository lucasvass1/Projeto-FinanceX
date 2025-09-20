import { PiggyBankIcon, TrendingUpIcon, WalletIcon, ArrowDownIcon } from "lucide-react";
import SummaryCard from "../_components/sumarry-card";
import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";

interface SummaryCardsProps {
  month?: string; 
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
 
  let m = Number(month ?? new Date().getMonth() + 1); 
  if (isNaN(m) || m < 1 || m > 12) {
    m = new Date().getMonth() + 1;
  }

  const year = new Date().getFullYear(); 
  const startDate = new Date(year, m - 1, 1); 
  const endDate = new Date(year, m, 1);       

  const baseFilter = { date: { gte: startDate, lt: endDate } };

 
  const depositsTotal = Number(
    (await db.transaction.aggregate({
      where: { ...baseFilter, type: TransactionType.DEPOSIT },
      _sum: { amount: true },
    }))._sum.amount ?? 0
  );

  const investmentsTotal = Number(
    (await db.transaction.aggregate({
      where: { ...baseFilter, type: TransactionType.INVESTMENT },
      _sum: { amount: true },
    }))._sum.amount ?? 0
  );

  const expensesTotal = Number(
    (await db.transaction.aggregate({
      where: { ...baseFilter, type: TransactionType.EXPENSE },
      _sum: { amount: true },
    }))._sum.amount ?? 0
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

 
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<ArrowDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
