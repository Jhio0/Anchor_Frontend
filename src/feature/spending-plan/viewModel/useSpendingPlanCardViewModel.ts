import { useRouter } from "expo-router";
import { useState } from "react";

import { roundMoney } from "@/feature/helper/formatMoney";

import { GetSpendingPlanDocument } from "@/network/__generated__/graphql";

import { useHandleQuery } from "@/components/shared/useHandleQuery";
import { formatMonthLabel } from "../model/spending-plan";

interface SpendingPlanCardViewModelParams {
  collectedExpenseId: string;
  moneyLeft: number;
}

export function useSpendingPlanCardViewModel({
  collectedExpenseId,
  moneyLeft,
}: SpendingPlanCardViewModelParams) {
  const router = useRouter();

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const { data, loading, error } = useHandleQuery(
    GetSpendingPlanDocument,
    {},
    "Couldn't load your spending plan.",
  );

  console.log(`What is the Error ${JSON.stringify(error)}`);

  const plan = data?.getSpendingPlan ?? null;

  // Allocation items may be nullable in the generated schema.
  const categories = (plan?.allocation ?? []).filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

  const totalBudget = roundMoney(plan?.totalBudget ?? 0);

  const totalSpent = roundMoney(
    categories.reduce((total, category) => total + category.spent, 0),
  );

  const remaining = roundMoney(totalBudget - totalSpent);

  const isOverBudget = remaining < 0;

  const safeMoneyLeft = Number.isFinite(moneyLeft)
    ? Math.max(0, roundMoney(moneyLeft))
    : 0;

  const canCreatePlan = collectedExpenseId.trim().length > 0;

  const openCreate = () => {
    if (!canCreatePlan) {
      return;
    }

    router.push({
      pathname: "/screens/create-spending-plan-screen",
      params: {
        collectedExpenseId,
        availableToPlan: String(safeMoneyLeft),
      },
    });
  };

  return {
    isLoading: loading,
    loadError: error,

    hasPlan: plan !== null,

    monthName: plan?.monthLabel ? formatMonthLabel(plan.monthLabel) : "",

    totalBudget,
    totalSpent,
    remaining,
    isOverBudget,

    categories,

    canCreatePlan,

    isInfoOpen,

    openInfo: () => setIsInfoOpen(true),
    closeInfo: () => setIsInfoOpen(false),

    openCreate,
  };
}
