import { extractScreen } from "@/feature/helper/extractScreen";
import {
  ExpenseSource,
  SubmitExpenseScreenDocument,
} from "@/network/__generated__/graphql";
import { ExpenseCategory } from "../../model/expense";
import { createExpenseViewModel } from "../createExpenseViewModal";

const SOURCE: ExpenseSource = "ESSENTIALS";

const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  { id: "rent", name: "Rent", enabled: false, amount: null, source: SOURCE },
  {
    id: "insurance",
    name: "Insurance",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
  {
    id: "grocery",
    name: "Grocery",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
  { id: "phone", name: "Phone", enabled: false, amount: null, source: SOURCE },
];

export const useEssentialExpensesViewModel = createExpenseViewModel({
  mutationDocument: SubmitExpenseScreenDocument,
  source: SOURCE,
  defaultCategories: DEFAULT_CATEGORIES,
  buildVariables: (applicationId, items) => ({
    input: { applicationId, items },
  }),
  getPayload: (data) => extractScreen(data?.submitExpenseScreen),
});
