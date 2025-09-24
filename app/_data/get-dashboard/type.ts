import { TransactionCategory, TransactionType } from "@prisma/client";


export type TransactionPercentagePerType = {
    [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
    category: TransactionCategory;
    total: number;
    percentageOfTotal: number;
}