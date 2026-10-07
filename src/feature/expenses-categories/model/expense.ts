import { ExpenseSource } from "@/network/__generated__/graphql";

export type ExpenseCategory = {
  id: string;
  name: string;
  enabled: boolean;
  amount: string | null; // CHANGED from number | null
  source: ExpenseSource;
};

export interface ExpenseItem {
  name: string;
  amount: number;
  source: ExpenseSource;
}
