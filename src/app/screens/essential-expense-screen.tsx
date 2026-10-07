import { ExpensesScreen } from "@/feature/expenses-categories/view/expense-screen";
import { useEssentialExpensesViewModel } from "@/feature/expenses-categories/viewModel/essential-expense/essentialExpenseViewModal";
import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";

import { ExpenseItem } from "@/feature/expenses-categories/model/expense";
import { useApplicationEditParams } from "@/feature/helper/userApplicationEditParams";
import { router } from "expo-router";

export default function EssentialExpensesRoute() {
  const {
    applicationId,
    editing,
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = useApplicationEditParams();

  const initialItems: ExpenseItem[] = essentialItems
    ? JSON.parse(essentialItems)
    : [];

  const vm = useEssentialExpensesViewModel(applicationId, {
    initialItems,
  });

  const handleSubmit = async () => {
    if (editing === "true") {
      router.replace({
        pathname: "/screens/information-review-screen",
        params: {
          applicationId,
          editing: "true",
          incomeAmount,

          essentialItems: JSON.stringify(vm.getItems()),

          financialLoanItems,
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
      stepLabel="Step 2 of 4"
      title="Which expenses apply to you?"
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
