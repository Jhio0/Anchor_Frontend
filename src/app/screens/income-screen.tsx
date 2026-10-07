import { CollectIncomeScreen } from "@/feature/collect-income/views/collect-income-screen";
import { useApplicationEditParams } from "@/feature/helper/userApplicationEditParams";

export default function IncomeRoute() {
  const {
    applicationId,
    editing,
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = useApplicationEditParams();

  return (
    <CollectIncomeScreen
      applicationId={applicationId}
      editing={editing === "true"}
      initialIncomeAmount={incomeAmount}
      essentialItems={essentialItems}
      financialLoanItems={financialLoanItems}
      subscriptionItems={subscriptionItems}
    />
  );
}
