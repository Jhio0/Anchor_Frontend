// feature/helper/screenRouteMapper.ts
import { ApplicationScreen } from "@/network/__generated__/graphql";

type ExpenseRoutePath =
  | "/screens/income-screen"
  | "/screens/essential-expense-screen"
  | "/screens/financial-loan-expense-screen"
  | "/screens/subscription-expense-screen"
  | "/screens/information-review-screen"
  | "/screens/completed-screen";

export const SCREEN_TO_ROUTE: Record<ApplicationScreen, ExpenseRoutePath> = {
  IncomeDetailScreen: "/screens/income-screen",
  EssentialExpenseScreen: "/screens/essential-expense-screen",
  FinancialLoanExpenseScreen: "/screens/financial-loan-expense-screen",
  SubscriptionExpenseScreen: "/screens/subscription-expense-screen",
  InformationReviewScreen: "/screens/information-review-screen",
  CompletedScreen: "/screens/completed-screen",
};
