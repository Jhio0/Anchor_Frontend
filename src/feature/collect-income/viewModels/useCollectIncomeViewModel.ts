// feature/income/viewModels/useCollectIncomeViewModel.ts

import { useRouter } from "expo-router";
import { useState } from "react";

import { useHandleMutation } from "@/components/shared/useHandleMutation";
import { navigateFromPayload } from "@/feature/helper/buildNextRouteParam";
import { SubmitCollectIncomeScreenDocument } from "@/network/__generated__/graphql";

interface IncomeViewModelOptions {
  editing?: boolean;
  initialIncomeAmount?: string;
  essentialItems?: string;
  financialLoanItems?: string;
  subscriptionItems?: string;
}

export function useCollectIncomeViewModel(
  applicationId: string,
  options: IncomeViewModelOptions = {},
) {
  const router = useRouter();

  const {
    editing = false,
    initialIncomeAmount = "",
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = options;

  const [incomeAmount, setIncomeAmount] = useState(initialIncomeAmount ?? "");

  const [submitIncome, { loading }] = useHandleMutation(
    SubmitCollectIncomeScreenDocument,
    "Unable to save your income.",
  );

  const onIncomeAmountChange = (value: string) => {
    setIncomeAmount(value);
  };

  const submit = async () => {
    if (editing) {
      router.replace({
        pathname: "/screens/information-review-screen",
        params: {
          applicationId,
          incomeAmount,
          essentialItems,
          financialLoanItems,
          subscriptionItems,
        },
      });

      return;
    }

    const result = await submitIncome({
      variables: {
        input: {
          applicationId,
          incomeAmount: Number(incomeAmount),
        },
      },
    });

    navigateFromPayload(
      router,
      applicationId,
      result.data?.submitCollectIncomeScreen,
    );
  };

  return {
    incomeAmount,
    onIncomeAmountChange,
    submit,
    isSubmitting: loading,
  };
}
