import { CollectedExpenseDataDocument } from "@/network/__generated__/graphql";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";

export function useHomeViewModel() {
  const router = useRouter();

  const { data, loading, error } = useQuery(CollectedExpenseDataDocument);

  const hasBudget = !!data?.collectedExpenseData;

  const openBudget = () => {
    if (loading) return;

    if (hasBudget) {
      router.push("/screens/collected-expense-data-screen");
      return;
    }

    router.push("/screens/create-application-screen");
  };

  return {
    hasBudget,
    isLoading: loading,
    hasError: !!error,
    openBudget,
  };
}
