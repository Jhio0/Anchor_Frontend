import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";

import { useDashboardRefresh } from "@/feature/collected-expense-data-dashboard/view/dashboard-refresh";
import { router } from "expo-router";
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
    refetch,
  } = useDashboardViewModel();

  const { refreshKey } = useDashboardRefresh();

  useEffect(() => {
    if (refreshKey === 0) {
      return;
    }

    refetch();
  }, [refreshKey, refetch]);

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (source: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [source]: !prev[source],
    }));
  };

  const incomeProgress =
    income > 0 ? Math.min(Math.max(moneyLeft / income, 0), 1) : 0;

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
    <YStack flex={1} background="$background" pt="$8" pb="$5">
      {/* Header */}
      <YStack px="$5" mb="$4">
        <Text fontSize="$3" color="$gray10" mb="$1">
          This month
        </Text>

        <Text fontSize="$8" fontWeight="800">
          Your month at a glance
        </Text>
      </YStack>

      {/* Dashboard scroll */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 32,
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

          <XStack justify="space-between" mt="$2">
            <Text fontSize="$3" color="$gray10">
              of ${income.toLocaleString()} income
            </Text>

            <Text fontSize="$3" color="$blue10" fontWeight="600">
              {Math.round(incomeProgress * 100)}%
            </Text>
          </XStack>

          {/* Income progress */}
          <YStack
            height={6}
            background="$blue4"
            style={{ borderRadius: 999 }}
            mt="$3"
            overflow="hidden"
          >
            <YStack
              height="100%"
              width={`${incomeProgress * 100}%`}
              background="$blue9"
              style={{ borderRadius: 999 }}
            />
          </YStack>
        </YStack>

        {/* Summary */}
        <XStack gap="$2" mb="$5">
          <YStack
            flex={1}
            background="$backgroundStrong"
            style={{ borderRadius: 12 }}
            p="$4"
          >
            <Text
              fontSize="$2"
              color="$gray10"
              mb="$1"
              textTransform="uppercase"
              letterSpacing={0.4}
            >
              Expenses
            </Text>

            <Text fontSize="$6" fontWeight="500">
              ${totalExpense.toLocaleString()}
            </Text>
          </YStack>

          <YStack
            flex={1}
            background="$backgroundStrong"
            style={{ borderRadius: 12 }}
            p="$4"
          >
            <Text
              fontSize="$2"
              color="$gray10"
              mb="$1"
              textTransform="uppercase"
              letterSpacing={0.4}
            >
              Savings
            </Text>

            <Text fontSize="$6" fontWeight="500">
              {savingsRate.toFixed(0)}%
            </Text>
          </YStack>
        </XStack>

        {/* Breakdown */}
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

        <YStack mb="$5" gap="$2">
          {breakdown.map((category) => {
            const isExpanded = expandedCategories[category.source] ?? false;

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
                  onPress={() => toggleCategory(category.source)}
                >
                  <XStack flex={1} items="center">
                    {/* Expanded accent */}
                    {isExpanded && (
                      <YStack
                        width={3}
                        height={36}
                        background="$blue9"
                        mr="$3"
                        style={{
                          borderRadius: 999,
                        }}
                      />
                    )}

                    <YStack>
                      <Text fontSize="$4" fontWeight="600">
                        {category.label}
                      </Text>

                      <Text fontSize="$2" color="$gray10" mt="$1">
                        {category.items.length}{" "}
                        {category.items.length === 1 ? "item" : "items"}
                      </Text>
                    </YStack>
                  </XStack>

                  <XStack items="center" gap="$3">
                    <Text fontSize="$4" fontWeight="600">
                      ${category.total.toLocaleString()}
                    </Text>

                    <Text
                      fontSize="$5"
                      color={isExpanded ? "$blue9" : "$gray9"}
                      style={{
                        lineHeight: 20,
                      }}
                    >
                      {isExpanded ? "⌄" : "›"}
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
                        <Text flex={1} fontSize="$3" color="$gray11">
                          {item.name}
                        </Text>

                        <Text fontSize="$3">
                          ${item.amount.toLocaleString()}
                        </Text>
                      </XStack>
                    ))}

                    {/* Edit expenses */}
                    <Button
                      size="$3"
                      variant="outlined"
                      mt="$2"
                      style={{
                        borderRadius: 10,
                      }}
                      onPress={() =>
                        router.push({
                          pathname: "/screens/updated-expense-items-screen",
                          params: {
                            category: category.source,
                            items: JSON.stringify(category.items),
                          },
                        })
                      }
                    >
                      Edit expenses
                    </Button>
                  </YStack>
                )}
              </YStack>
            );
          })}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
