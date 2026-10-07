import { useLocalSearchParams } from "expo-router";

export type ApplicationEditParams = {
  applicationId: string;
  editing?: string;
  incomeAmount?: string;
  essentialItems?: string;
  financialLoanItems?: string;
  subscriptionItems?: string;
};

export function useApplicationEditParams() {
  return useLocalSearchParams<ApplicationEditParams>();
}
