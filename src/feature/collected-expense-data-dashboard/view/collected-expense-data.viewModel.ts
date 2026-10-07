// feature/dashboard/viewModels/useDashboardViewModel.ts

import { useRouter } from "expo-router";

import { useHandleQuery } from "@/components/shared/useHandleQuery";
import { ExpenseItem } from "@/feature/expenses-categories/model/expense";
import { CollectedExpenseDataDocument } from "@/network/__generated__/graphql";

export function useDashboardViewModel() {
  const router = useRouter();

  const { data, loading, error, refetch } = useHandleQuery(
    CollectedExpenseDataDocument,
    {}, // No variables required
    "Unable to load your dashboard.",
  );

  const dashboard = data?.collectedExpenseData;

  const breakdown = dashboard
    ? [
        {
          source: "ESSENTIALS",
          label: "Essential expenses",
          items: dashboard.essentialItems,
        },
        {
          source: "FINANCIAL_LOAN",
          label: "Financial loans",
          items: dashboard.financialItems,
        },
        {
          source: "SUBSCRIPTION",
          label: "Subscriptions",
          items: dashboard.subscriptionItems,
        },
      ].map((category) => ({
        ...category,
        total: category.items.reduce((total, item) => total + item.amount, 0),
      }))
    : [];

  const editThisMonth = () => {
    if (!dashboard) return;

    router.push({
      pathname: "/screens/information-review-screen",
      params: {
        applicationId: dashboard.applicationId,
        incomeAmount: dashboard.income.toString(),
        essentialItems: JSON.stringify(dashboard.essentialItems),
        financialLoanItems: JSON.stringify(dashboard.financialItems),
        subscriptionItems: JSON.stringify(dashboard.subscriptionItems),
      },
    });
  };

  const startNextMonth = () => {
    router.push("/screens/create-application-screen");
  };

  const editCategory = (category: string, items: ExpenseItem[]) => {
    router.push({
      pathname: "/screens/updated-expense-items-screen",
      params: {
        category,
        items: JSON.stringify(items),
      },
    });
  };

  return {
    income: dashboard?.income ?? 0,
    totalExpense: dashboard?.totalExpense ?? 0,
    moneyLeft: dashboard?.moneyLeft ?? 0,
    savingsRate: dashboard?.savingsRate ?? 0,
    breakdown,
    isLoading: loading,
    loadError: error,
    editThisMonth,
    startNextMonth,
    refetch,
    editCategory,
  };
}
