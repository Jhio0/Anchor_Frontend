import { useLocalSearchParams, useRouter } from "expo-router";

import { useHandleMutation } from "@/components/shared/useHandleMutation";
import { ExpenseItem } from "@/feature/expenses-categories/model/expense";
import {
  ExpenseSource,
  UpdateCollectedExpenseItemsDocument,
} from "@/network/__generated__/graphql";
import { useState } from "react";

export function useUpdatedExpenseItemViewModel() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    category: ExpenseSource;
    items: string;
  }>();

  const category = params.category;

  const initialItems: ExpenseItem[] = params.items
    ? JSON.parse(params.items)
    : [];

  const [items, setItems] = useState<ExpenseItem[]>(initialItems);

  const [updateExpenseItems, { loading }] = useHandleMutation(
    UpdateCollectedExpenseItemsDocument,
    "Unable to save your expenses.",
  );

  const addExpense = (name: string, amount: number) => {
    setItems((prev) => [
      ...prev,
      {
        name,
        amount,
        source: category,
      },
    ]);
  };

  const updateExpense = (
    index: number,
    field: "name" | "amount",
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          [field]: field === "amount" ? Number(value) : value,
        };
      }),
    );
  };

  const removeExpense = (index: number) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const save = async () => {
    await updateExpenseItems({
      variables: {
        input: {
          category,
          items: items.map((item) => ({
            name: item.name,
            amount: item.amount,
          })),
        },
      },
    });

    router.back();
  };

  return {
    category,
    items,
    loading,
    addExpense,
    updateExpense,
    removeExpense,
    save,
  };
}
