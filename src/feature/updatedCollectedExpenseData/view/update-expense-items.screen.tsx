import { Button, Input, ScrollView, Text, XStack, YStack } from "tamagui";
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

  const categoryTitle = {
    ESSENTIALS: "Essential expenses",
    FINANCIAL_LOAN: "Financial loans",
    SUBSCRIPTION: "Subscriptions",
  }[category];

  return (
    <YStack flex={1} background="$background">
      {/* Header */}
      <YStack px="$5" pt="$8" pb="$4">
        <Text fontSize="$3" color="$gray10">
          Edit your budget
        </Text>

        <Text fontSize="$8" fontWeight="800" mt="$1">
          {categoryTitle}
        </Text>

        <Text fontSize="$3" color="$gray10" mt="$2">
          Update your expenses or add a new one.
        </Text>
      </YStack>

      {/* Expenses */}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack px="$5" pb="$8" gap="$3">
          {items.map((item, index) => (
            <YStack
              key={`${item.name}-${index}`}
              background="$backgroundStrong"
              p="$4"
              style={{ borderRadius: 12 }}
              gap="$3"
            >
              <XStack justify="space-between" items="center">
                <Text fontSize="$4" fontWeight="600">
                  Expense {index + 1}
                </Text>

                <Text
                  color="$red10"
                  pressStyle={{ opacity: 0.6 }}
                  onPress={() => removeExpense(index)}
                >
                  Remove
                </Text>
              </XStack>

              <Input
                value={item.name}
                placeholder="Expense name"
                onChangeText={(value) => updateExpense(index, "name", value)}
              />

              <Input
                value={item.amount.toString()}
                placeholder="Amount"
                keyboardType="numeric"
                onChangeText={(value) => updateExpense(index, "amount", value)}
              />
            </YStack>
          ))}

          <Button
            size="$5"
            variant="outlined"
            style={{ borderRadius: 12 }}
            onPress={() => addExpense("New expense", 0)}
          >
            + Add expense
          </Button>
        </YStack>
      </ScrollView>

      {/* Save button */}
      <YStack background="$background" px="$5" py="$4">
        <Button
          size="$5"
          background="$blue9"
          color="white"
          fontWeight="700"
          style={{ borderRadius: 14 }}
          disabled={loading}
          onPress={save}
        >
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </YStack>
    </YStack>
  );
}
