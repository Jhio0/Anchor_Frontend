import {
  ExpenseSource,
  SubmitExpenseScreenDocument,
} from "@/network/__generated__/graphql";
import { ExpenseCategory } from "../../model/expense";
import { createExpenseViewModel } from "../createExpenseViewModal";

const SOURCE: ExpenseSource = "SUBSCRIPTION";

const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  {
    id: "streaming",
    name: "Streaming services",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
  {
    id: "software",
    name: "Software subscriptions",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
  {
    id: "gym",
    name: "Gym membership",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
];

export const useSubscriptionExpensesViewModel = createExpenseViewModel({
  mutationDocument: SubmitExpenseScreenDocument,
  source: SOURCE,
  defaultCategories: DEFAULT_CATEGORIES,
  buildVariables: (applicationId, items) => ({
    input: { applicationId, items },
  }),
  getPayload: (data) => data?.submitExpenseScreen,
});
