import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./type";

export const getDashboard = async (month?: string) => {
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

  const transactionsTotal = Number(
    (await db.transaction.aggregate({
      where: { ...baseFilter },
      _sum: { amount: true },
    }))._sum.amount ?? 0
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const typePercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: transactionsTotal > 0
      ? Math.round((depositsTotal / transactionsTotal) * 100)
      : 0,
    [TransactionType.INVESTMENT]: transactionsTotal > 0
      ? Math.round((investmentsTotal / transactionsTotal) * 100)
      : 0,
    [TransactionType.EXPENSE]: transactionsTotal > 0
      ? Math.round((expensesTotal / transactionsTotal) * 100)
      : 0,
  };

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    transactionsTotal,
    typePercentage,
  };
};
