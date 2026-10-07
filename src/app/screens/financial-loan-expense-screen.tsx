import { ExpenseItem } from "@/feature/expenses-categories/model/expense";
import { ExpensesScreen } from "@/feature/expenses-categories/view/expense-screen";
import { useFinancialLoanExpensesViewModel } from "@/feature/expenses-categories/viewModel/financial-expense/financialExpenseViewModal";
import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";

import { useApplicationEditParams } from "@/feature/helper/userApplicationEditParams";
import { router } from "expo-router";

export default function FinancialLoanExpensesRoute() {
  const {
    applicationId,
    editing,
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = useApplicationEditParams();

  const initialItems: ExpenseItem[] = financialLoanItems
    ? JSON.parse(financialLoanItems)
    : [];

  const vm = useFinancialLoanExpensesViewModel(applicationId, { initialItems });

  const handleSubmit = async () => {
    if (editing === "true") {
      router.replace({
        pathname: "/screens/information-review-screen",
        params: {
          applicationId,
          editing: "true",
          incomeAmount,
          essentialItems,

          financialLoanItems: JSON.stringify(vm.getItems()),

          subscriptionItems,
        },
      });

      return;
    }

    const nextScreen = await vm.submit();

    if (nextScreen) {
      const route = SCREEN_TO_ROUTE[nextScreen];

      if (route) {
        router.push({
          pathname: route,
          params: {
            applicationId,
          },
        });
      }
    }
  };
  return (
    <ExpensesScreen
      stepLabel="Step 3 of 4"
      title="Any loan payments?"
      categories={vm.categories}
      onToggleCategory={vm.onToggleCategory}
      onAmountChange={vm.onAmountChange}
      onAddCustomCategory={vm.onAddCustomCategory}
      onRemoveCategory={vm.onRemoveCategory}
      onSubmit={handleSubmit}
      canSubmit={vm.hasAtLeastOneAmount}
    />
  );
}
