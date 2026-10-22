// app/screens/create-spending-plan-screen.tsx
import { useLocalSearchParams } from "expo-router";

import { CreateSpendingPlanScreen } from "@/feature/spending-plan/view/create-spending-plan-screen";

export default function CreateSpendingPlanRoute() {
  const { collectedExpenseId, availableToPlan } = useLocalSearchParams<{
    collectedExpenseId: string;
    availableToPlan: string;
  }>();

  return (
    <CreateSpendingPlanScreen
      collectedExpenseId={collectedExpenseId}
      availableToPlan={Number(availableToPlan)}
    />
  );
}
