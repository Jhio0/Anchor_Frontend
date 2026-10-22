import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useState } from "react";

import { roundMoney } from "@/feature/helper/formatMoney";

import {
  CreateSpendingPlanDocument,
  GetSpendingPlanDocument,
} from "@/network/__generated__/graphql";

import {
  parseAmount,
  sanitizeAmountInput,
  toCreateSpendingPlanInput,
} from "../model/spending-plan";

export function useCreateSpendingPlanViewModel(
  collectedExpenseId: string,
  availableToPlan: number,
) {
  const router = useRouter();

  const [amount, setAmount] = useState("");

  const [createSpendingPlan, { loading, error }] = useMutation(
    CreateSpendingPlanDocument,
  );

  const safeAvailableToPlan = Number.isFinite(availableToPlan)
    ? Math.max(0, roundMoney(availableToPlan))
    : 0;

  const plannedAmount = parseAmount(amount);

  const leftUnplanned = roundMoney(safeAvailableToPlan - plannedAmount);

  const isOverAvailable = leftUnplanned < 0;

  const overBy = isOverAvailable ? Math.abs(leftUnplanned) : 0;

  const hasValidId = collectedExpenseId.trim().length > 0;

  const canSubmit =
    hasValidId && plannedAmount > 0 && !isOverAvailable && !loading;

  const onAmountChange = (value: string) => {
    setAmount(sanitizeAmountInput(value));
  };

  const submit = async () => {
    if (!canSubmit) {
      return;
    }

    try {
      const input = toCreateSpendingPlanInput(collectedExpenseId, amount);

      const result = await createSpendingPlan({
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: GetSpendingPlanDocument,
          },
        ],
        awaitRefetchQueries: true,
      });

      if (result.data?.createSpendingPlan) {
        router.back();
      }
    } catch {
      // Apollo exposes the mutation error through its error state.
      // Keep the user on the screen so they can retry.
    }
  };

  return {
    amount,

    availableToPlan: safeAvailableToPlan,
    plannedAmount,
    leftUnplanned,

    isOverAvailable,
    overBy,

    canSubmit,
    isSubmitting: loading,

    submitError: error,

    onAmountChange,
    submit,

    goBack: () => router.back(),
  };
}
