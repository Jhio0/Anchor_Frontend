import { useState } from "react";
import { ScrollView } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { useDashboardViewModel } from "../view/collected-expense-data.viewModel";

export function DashboardScreen() {
  const {
    income,
    totalExpense,
    moneyLeft,
    savingsRate,
    breakdown,
    isLoading,
    loadError,
    editThisMonth,
  } = useDashboardViewModel();

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <YStack flex={1} background="$background" items="center" justify="center">
        <Text color="$gray10">Loading your month...</Text>
      </YStack>
    );
  }

  if (loadError) {
    return (
      <YStack
        flex={1}
        background="$background"
        items="center"
        justify="center"
        px="$5"
      >
        <Text color="$red10" style={{ textAlign: "center" }}>
          Couldn't load your budget. Pull to refresh or try again shortly.
        </Text>
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      background="$background"
      pt="$8"
      pb="$5"
      justify="space-between"
    >
      <YStack px="$5" mb="$4">
        <Text fontSize="$3" color="$gray10" mb="$1">
          This month
        </Text>

        <Text fontSize="$8" fontWeight="800">
          Your month at a glance
        </Text>
      </YStack>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Money left */}
        <YStack
          background="$blue2"
          borderWidth={1}
          borderColor="$blue5"
          style={{ borderRadius: 16 }}
          p="$5"
          mb="$3"
        >
          <Text fontSize="$3" color="$blue10" mb="$2">
            Money left
          </Text>

          <Text fontSize="$11" fontWeight="500">
            ${moneyLeft.toLocaleString()}
          </Text>

          <Text fontSize="$3" color="$gray10" mt="$2">
            of ${income.toLocaleString()} income
          </Text>
        </YStack>

        {/* Summary */}
        <XStack gap="$2" mb="$5">
          <YStack
            flex={1}
            background="$backgroundStrong"
            style={{ borderRadius: 12 }}
            p="$3"
          >
            <Text fontSize="$2" color="$gray10" mb="$1">
              Total expenses
            </Text>

            <Text fontSize="$6" fontWeight="500">
              ${totalExpense.toLocaleString()}
            </Text>
          </YStack>

          <YStack
            flex={1}
            background="$backgroundStrong"
            style={{ borderRadius: 12 }}
            p="$3"
          >
            <Text fontSize="$2" color="$gray10" mb="$1">
              Savings rate
            </Text>

            <Text fontSize="$6" fontWeight="500">
              {savingsRate.toFixed(0)}%
            </Text>
          </YStack>
        </XStack>

        {/* Breakdown title */}
        <Text
          fontSize="$2"
          fontWeight="600"
          color="$gray9"
          textTransform="uppercase"
          letterSpacing={0.5}
          mb="$3"
        >
          Breakdown
        </Text>

        {/* Categories */}
        <YStack mb="$5" gap="$2">
          {breakdown.map((category) => {
            const isExpanded = expandedCategory === category.source;

            return (
              <YStack
                key={category.source}
                background="$backgroundStrong"
                style={{ borderRadius: 12 }}
                overflow="hidden"
              >
                {/* Category header */}
                <XStack
                  justify="space-between"
                  items="center"
                  px="$4"
                  py="$4"
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() =>
                    setExpandedCategory(isExpanded ? null : category.source)
                  }
                >
                  <YStack>
                    <Text fontSize="$4" fontWeight="600">
                      {category.label}
                    </Text>

                    <Text fontSize="$2" color="$gray10" mt="$1">
                      {category.items.length}{" "}
                      {category.items.length === 1 ? "item" : "items"}
                    </Text>
                  </YStack>

                  <XStack items="center" gap="$2">
                    <Text fontSize="$4" fontWeight="600">
                      ${category.total.toLocaleString()}
                    </Text>

                    <Text fontSize="$5" color="$gray10">
                      {isExpanded ? "−" : "+"}
                    </Text>
                  </XStack>
                </XStack>

                {/* Items */}
                {isExpanded && (
                  <YStack px="$4" pb="$3">
                    {category.items.map((item, index) => (
                      <XStack
                        key={`${item.name}-${index}`}
                        justify="space-between"
                        items="center"
                        py="$3"
                        borderTopWidth={0.5}
                        borderTopColor="$gray5"
                      >
                        <Text fontSize="$3" color="$gray11">
                          {item.name}
                        </Text>

                        <Text fontSize="$3">
                          ${item.amount.toLocaleString()}
                        </Text>
                      </XStack>
                    ))}
                  </YStack>
                )}
              </YStack>
            );
          })}
        </YStack>
      </ScrollView>

      {/* Bottom button */}
      {/* <YStack px="$5" gap="$2">
        <Button
          size="$5"
          style={{ borderRadius: 14 }}
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={editThisMonth}
        >
          Edit this month
        </Button>
      </YStack> */}
    </YStack>
  );
}
