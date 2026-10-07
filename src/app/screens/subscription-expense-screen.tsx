import { ExpenseItem } from "@/feature/expenses-categories/model/expense";
import { ExpensesScreen } from "@/feature/expenses-categories/view/expense-screen";
import { useSubscriptionExpensesViewModel } from "@/feature/expenses-categories/viewModel/subscription-expense/subscriptionExpenseViewModal";
import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { useApplicationEditParams } from "@/feature/helper/userApplicationEditParams";
import { router } from "expo-router";

export default function SubscriptionExpensesRoute() {
  const {
    applicationId,
    editing,
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = useApplicationEditParams();

  const initialItems: ExpenseItem[] = subscriptionItems
    ? JSON.parse(subscriptionItems)
    : [];

  const vm = useSubscriptionExpensesViewModel(applicationId, { initialItems });

  const handleSubmit = async () => {
    if (editing === "true") {
      router.replace({
        pathname: "/screens/information-review-screen",
        params: {
          applicationId,
          editing: "true",
          incomeAmount,
          essentialItems,
          financialLoanItems,

          subscriptionItems: JSON.stringify(vm.getItems()),
        },
      });

      return;
    }

    const payload = await vm.submit();
    if (!payload || !("screen" in payload) || !payload.screen) {
      console.log("no screen on payload — not navigating");
      return;
    }

    const route = SCREEN_TO_ROUTE[payload.screen];

    if (!route) {
      console.log("no route");
      return;
    }

    router.push({
      pathname: route,
      params: {
        applicationId,
        ...(payload.__typename === "InformationReviewPayload" && {
          incomeAmount: payload.incomeAmount?.toString(),
          essentialItems: JSON.stringify(payload.essentialItems ?? []),
          financialLoanItems: JSON.stringify(payload.financialLoanItems ?? []),
          subscriptionItems: JSON.stringify(payload.subscriptionItems ?? []),
        }),
      },
    });
  };

  return (
    <ExpensesScreen
      stepLabel="Step 4 of 4"
      title="Any subscriptions to track?"
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
