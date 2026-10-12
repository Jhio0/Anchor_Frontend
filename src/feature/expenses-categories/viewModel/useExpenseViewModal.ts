import { showErrorToast } from "@/components/shared/toast";
import { ExpenseSource } from "@/network/__generated__/graphql";
import { useState } from "react";
import { ExpenseCategory, ExpenseItem } from "../model/expense";

interface UseExpensesViewModelParams<TResult> {
  defaultCategories: ExpenseCategory[];
  source: ExpenseSource;
  initialItems?: ExpenseItem[];
  onSubmit: (items: ExpenseItem[]) => Promise<TResult>;
}

const isInvalidAmount = (c: ExpenseCategory) =>
  c.enabled && (c.amount === null || Number(c.amount) <= 0);

export function useExpensesViewModel<TResult>({
  defaultCategories,
  source,
  onSubmit,
  initialItems,
}: UseExpensesViewModelParams<TResult>) {
  const [categories, setCategories] = useState<ExpenseCategory[]>(() => {
    if (!initialItems || initialItems.length === 0) {
      return defaultCategories;
    }
    return initialItems.map((item, index) => ({
      id: `${item.source}_${item.name}_${index}`,
      name: item.name,
      enabled: true,
      amount: item.amount.toString(), // ← add .toString() here
      source: item.source,
    }));
  });

  const onToggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              enabled: !category.enabled,
              amount: !category.enabled ? category.amount : null,
            }
          : category,
      ),
    );
  };

  const onAmountChange = (id: string, value: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? { ...category, amount: value === "" ? null : value }
          : category,
      ),
    );
  };
  // CHANGED — now takes amount directly, category is created fully filled-in

  const onAddCustomCategory = (name: string, amount: number) => {
    const newCategory: ExpenseCategory = {
      id: `custom_${Date.now()}`,
      name,
      enabled: true,
      amount: amount.toString(), // store as string, consistent with the rest
      source,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const onRemoveCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const hasAtLeastOneAmount = categories.some(
    (c) => c.enabled && c.amount !== null && Number(c.amount) > 0,
  );

  // Returns true (and shows a toast) if any enabled category has a blank/zero amount
  const warnIfZeroAmount = (): boolean => {
    const invalid = categories.filter(isInvalidAmount);

    if (invalid.length === 0) return false;

    showErrorToast(
      invalid.length === 1
        ? `Please enter an amount greater than 0 for ${invalid[0].name}.`
        : `Please enter an amount greater than 0 for: ${invalid
            .map((c) => c.name)
            .join(", ")}.`,
    );

    return true;
  };

  const getItems = (): ExpenseItem[] => {
    return categories
      .filter((c) => c.enabled && c.amount !== null && Number(c.amount) > 0)
      .map((c) => ({
        name: c.name,
        amount: Number(c.amount), // parse to number ONLY here, at submit time
        source,
      }));
  };

  const submit = async () => {
    const items = getItems();
    return onSubmit(items);
  };

  return {
    categories,
    onToggleCategory,
    onAmountChange,
    onAddCustomCategory,
    onRemoveCategory,
    hasAtLeastOneAmount,
    warnIfZeroAmount,
    getItems,
    submit,
  };
}
