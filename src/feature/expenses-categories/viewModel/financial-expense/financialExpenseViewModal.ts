import { extractScreen } from "@/feature/helper/extractScreen";
import {
  ExpenseSource,
  SubmitExpenseScreenDocument,
} from "@/network/__generated__/graphql";
import { ExpenseCategory } from "../../model/expense";
import { createExpenseViewModel } from "../createExpenseViewModal";

const SOURCE: ExpenseSource = "FINANCIAL_LOAN";

const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  {
    id: "car_loan",
    name: "Car loan",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
  {
    id: "student_loan",
    name: "Student loan",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
  {
    id: "personal_loan",
    name: "Personal loan",
    enabled: false,
    amount: null,
    source: SOURCE,
  },
];

export const useFinancialLoanExpensesViewModel = createExpenseViewModel({
  mutationDocument: SubmitExpenseScreenDocument,
  source: SOURCE,
  defaultCategories: DEFAULT_CATEGORIES,
  buildVariables: (applicationId, items) => ({
    input: { applicationId, items },
  }),
  getPayload: (data) => extractScreen(data?.submitExpenseScreen),
});
