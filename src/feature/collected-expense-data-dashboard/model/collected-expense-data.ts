import { ExpenseItem } from "@/feature/expenses-categories/model/expense";

export type CollectedExpenseDataDashboard = {
  userId: string;
  applicationId: string;
  income: number;
  totalExpense: number;
  moneyLeft: number;
  savingsRate: number;
  essentialItems: ExpenseItem[];
  financialItems: ExpenseItem[];
  subscriptionItems: ExpenseItem[];
};
