import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

import { formatMoney } from "@/feature/helper/formatMoney";

import { useSpendingPlanCardViewModel } from "../viewModel/useSpendingPlanCardViewModel";
import { SpendingPlanInfoSheet } from "./spending-plan-info-sheet";

interface SpendingPlanCardProps {
  collectedExpenseId: string;
  moneyLeft: number;
}

export function SpendingPlanCard({
  collectedExpenseId,
  moneyLeft,
}: SpendingPlanCardProps) {
  const vm = useSpendingPlanCardViewModel({
    collectedExpenseId,
    moneyLeft,
  });

  const theme = useTheme();

  if (vm.isLoading) {
    return (
      <YStack
        background="$backgroundStrong"
        p="$4"
        marginEnd="$5"
        gap="$2"
        style={{
          borderRadius: 16,
        }}
      >
        <Text fontSize="$4" fontWeight="600">
          Spending Plan
        </Text>

        <Text fontSize="$3" color="$gray10">
          Loading your spending plan...
        </Text>
      </YStack>
    );
  }

  if (vm.loadError) {
    return (
      <YStack
        background="$backgroundStrong"
        p="$4"
        marginEnd="$5"
        gap="$2"
        style={{
          borderRadius: 16,
        }}
      >
        <Text fontSize="$4" fontWeight="600">
          Spending Plan
        </Text>

        <Text fontSize="$3" color="$gray10">
          Couldn't load your spending plan. Please try again later.
        </Text>
      </YStack>
    );
  }

  return (
    <YStack marginEnd="$5">
      {vm.hasPlan ? (
        <YStack
          background="$backgroundStrong"
          p="$4"
          gap="$3"
          style={{
            borderRadius: 16,
          }}
        >
          <XStack items="center" justify="space-between">
            <XStack items="center" gap="$2">
              <MaterialCommunityIcons
                name="wallet-outline"
                size={20}
                color={theme.blue10.val}
              />

              <Text fontSize="$4" fontWeight="600">
                Spending Plan
              </Text>
            </XStack>

            <Text fontSize="$2" color="$gray10">
              {vm.monthName}
            </Text>
          </XStack>

          <YStack gap="$1">
            <Text fontSize="$2" color="$gray10">
              {vm.isOverBudget ? "Amount over budget" : "Amount remaining"}
            </Text>

            <Text
              fontSize="$9"
              fontWeight="700"
              color={vm.isOverBudget ? "$red10" : "$color"}
            >
              {formatMoney(Math.abs(vm.remaining))}
            </Text>

            <Text fontSize="$3" color="$gray10">
              {formatMoney(vm.totalSpent)} spent of{" "}
              {formatMoney(vm.totalBudget)}
            </Text>
          </YStack>

          <YStack
            height={8}
            background="$blue3"
            overflow="hidden"
            style={{
              borderRadius: 999,
            }}
          >
            <YStack
              height="100%"
              background={vm.isOverBudget ? "$red9" : "$blue9"}
              width={`${
                vm.totalBudget > 0
                  ? Math.min((vm.totalSpent / vm.totalBudget) * 100, 100)
                  : 0
              }%`}
              style={{
                borderRadius: 999,
              }}
            />
          </YStack>

          {vm.categories.length > 0 && (
            <YStack gap="$1">
              {vm.categories.map((category, index) => (
                <XStack
                  key={`${category.name}-${index}`}
                  items="center"
                  justify="space-between"
                  py="$2"
                  borderTopWidth={1}
                  borderTopColor="$borderColor"
                >
                  <Text fontSize="$3">{category.name}</Text>

                  <Text fontSize="$3" color="$gray10">
                    {formatMoney(category.spent)} spent
                  </Text>
                </XStack>
              ))}
            </YStack>
          )}

          <Text fontSize="$2" color="$gray10">
            Your spending plan helps you keep track of the money you've set
            aside this month.
          </Text>
        </YStack>
      ) : (
        <YStack
          width="100%"
          background="$backgroundStrong"
          p="$4"
          gap="$3"
          borderWidth={1}
          borderColor="$borderColor"
          style={{
            borderRadius: 16,
            borderStyle: "dashed",
          }}
        >
          <XStack items="center" justify="space-between">
            <XStack items="center" gap="$2">
              <MaterialCommunityIcons
                name="wallet-outline"
                size={20}
                color={theme.blue10.val}
              />

              <Text fontSize="$4" fontWeight="600">
                Spending Plan
              </Text>
            </XStack>

            <YStack
              width={36}
              height={36}
              items="center"
              justify="center"
              style={{
                borderRadius: 18,
              }}
              onPress={vm.openInfo}
              accessibilityRole="button"
              accessibilityLabel="Learn about spending plans"
            >
              <MaterialCommunityIcons
                name="information-outline"
                size={21}
                color={theme.gray10.val}
              />
            </YStack>
          </XStack>

          <Text
            fontSize="$3"
            color="$gray10"
            style={{
              lineHeight: 21,
            }}
          >
            Turn some of your money left into a budget for everyday spending,
            like lunch, entertainment, and going out.
          </Text>

          <Button
            size="$5"
            background="$blue9"
            color="white"
            fontWeight="700"
            disabled={!vm.canCreatePlan}
            opacity={vm.canCreatePlan ? 1 : 0.5}
            onPress={vm.openCreate}
            style={{
              borderRadius: 14,
            }}
          >
            Create spending plan
          </Button>
        </YStack>
      )}

      <SpendingPlanInfoSheet visible={vm.isInfoOpen} onClose={vm.closeInfo} />
    </YStack>
  );
}
