import { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Input, Text, XStack, YStack } from "tamagui";

import { AddCategoryModal } from "@/feature/expenses-categories/view/add-category-modal";
import { useUpdatedExpenseItemViewModel } from "../viewModel/updateExpenseItems";

export function UpdatedExpenseItemsScreen() {
  const {
    category,
    items,
    loading,
    addExpense,
    updateExpense,
    removeExpense,
    save,
  } = useUpdatedExpenseItemViewModel();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

  const categoryTitle = {
    ESSENTIALS: "Essential expenses",
    FINANCIAL_LOAN: "Financial loans",
    SUBSCRIPTION: "Subscriptions",
  }[category];

  const handleConfirmAdd = (name: string, amount: number) => {
    addExpense(name, amount);
    setIsAddModalOpen(false);
  };

  const handleRemove = (index: number) => {
    const id = `${items[index].name}-${index}`;

    swipeableRefs.current[id]?.close();
    removeExpense(index);
  };

  const renderRightAction = (index: number) => (
    <XStack
      width={64}
      items="center"
      justify="center"
      background="$red9"
      style={{ borderRadius: 12 }}
      ml="$2"
      onPress={() => handleRemove(index)}
    >
      <Text color="white" fontSize="$6" fontWeight="700">
        ✕
      </Text>
    </XStack>
  );

  return (
    <YStack
      flex={1}
      background="$background"
      pt="$8"
      pb="$5"
      justify="space-between"
    >
      {/* Header */}
      <YStack gap="$4" px="$5">
        <Text
          fontSize="$3"
          fontWeight="600"
          color="$gray10"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Edit your budget
        </Text>

        <Text fontSize="$8" fontWeight="800" lineHeight="$8">
          {categoryTitle}
        </Text>

        <Text fontSize="$3" color="$gray10">
          Update your expenses or add a new one.
        </Text>
      </YStack>

      {/* Expenses */}
      <ScrollView
        style={{ flex: 1, marginTop: 16 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$2">
          {items.map((item, index) => {
            const id = `${item.name}-${index}`;

            return (
              <Swipeable
                key={id}
                ref={(ref) => {
                  swipeableRefs.current[id] = ref;
                }}
                renderRightActions={() => renderRightAction(index)}
                overshootRight={false}
              >
                <XStack
                  items="center"
                  justify="space-between"
                  py="$3"
                  px="$4"
                  background="$backgroundStrong"
                  style={{ borderRadius: 12 }}
                >
                  <Input
                    unstyled
                    flex={1}
                    value={item.name}
                    placeholder="Expense name"
                    onChangeText={(value) =>
                      updateExpense(index, "name", value)
                    }
                    fontSize="$4"
                    color="$color"
                  />

                  <XStack items="center" gap="$1">
                    <Text fontSize="$4" fontWeight="600" color="$gray10">
                      $
                    </Text>

                    <Input
                      unstyled
                      width={80}
                      placeholder="0"
                      keyboardType="decimal-pad"
                      value={item.amount.toString()}
                      onChangeText={(value) =>
                        updateExpense(index, "amount", value)
                      }
                      fontSize="$4"
                      fontWeight="600"
                      style={{ textAlign: "right" }}
                      color="$gray10"
                    />
                  </XStack>
                </XStack>
              </Swipeable>
            );
          })}

          {/* Add expense */}
          <XStack
            items="center"
            justify="center"
            py="$3"
            mt="$2"
            borderWidth={1}
            borderStyle="dashed"
            borderColor="$borderColor"
            style={{ borderRadius: 12 }}
            onPress={() => setIsAddModalOpen(true)}
          >
            <Text fontSize="$4" color="$gray10">
              + Add expense
            </Text>
          </XStack>

          <Text
            fontSize="$2"
            color="$gray9"
            mt="$3"
            style={{ textAlign: "center" }}
          >
            Tip: swipe left on an expense to remove it
          </Text>
        </YStack>
      </ScrollView>

      {/* Save */}
      <YStack px="$5">
        <Button
          size="$5"
          style={{ borderRadius: 14 }}
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={save}
          disabled={loading}
          opacity={loading ? 0.5 : 1}
        >
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </YStack>

      {/* Add expense modal */}
      <AddCategoryModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />
    </YStack>
  );
}
