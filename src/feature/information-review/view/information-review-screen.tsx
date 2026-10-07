// feature/information-review/views/information-review-screen.tsx
import { ScrollView } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { useInformationReviewViewModel } from "../viewModel/informationReviewViewModel";

export function InformationReviewScreen() {
  const {
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
    totalExpenses,
    moneyLeft,
    editIncome,
    editEssentialExpenses,
    editFinancialLoanExpenses,
    editSubscriptions,
    submit,
    isSubmitting,
  } = useInformationReviewViewModel();

  return (
    <YStack
      flex={1}
      background="$background"
      pt="$8"
      pb="$5"
      justify="space-between"
    >
      <YStack gap="$4" px="$5">
        <Text
          fontSize="$3"
          fontWeight="600"
          color="$gray10"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Step 4 of 4
        </Text>
        <Text fontSize="$8" fontWeight="800" lineHeight="$8">
          Review before you submit
        </Text>
      </YStack>

      <ScrollView
        style={{ flex: 1, marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$3">
          {/* Income */}
          <YStack
            background="$backgroundStrong"
            borderWidth={1}
            borderColor="$borderColor"
            style={{ borderRadius: 12 }}
            p="$4"
          >
            <XStack justify="space-between" items="center" mb="$2">
              <Text fontSize="$2" color="$gray10">
                Income
              </Text>
              <Text
                fontSize="$2"
                color="$blue10"
                fontWeight="600"
                onPress={editIncome}
              >
                Edit
              </Text>
            </XStack>
            <Text fontSize="$6" fontWeight="700">
              ${incomeAmount?.toLocaleString() ?? 0}
            </Text>
          </YStack>

          {/* Essential expenses */}
          <YStack
            background="$backgroundStrong"
            borderWidth={1}
            borderColor="$borderColor"
            style={{ borderRadius: 12 }}
            p="$4"
          >
            <XStack justify="space-between" items="center" mb="$2">
              <Text fontSize="$2" color="$gray10">
                Expenses
              </Text>
              <Text
                fontSize="$2"
                color="$blue10"
                fontWeight="600"
                onPress={editEssentialExpenses}
              >
                Edit
              </Text>
            </XStack>
            {essentialItems.length === 0 ? (
              <Text fontSize="$3" color="$gray9">
                No expenses added
              </Text>
            ) : (
              essentialItems.map((item) => (
                <XStack key={item.name} justify="space-between" mb="$1">
                  <Text fontSize="$3">{item.name}</Text>
                  <Text fontSize="$3">${item.amount.toLocaleString()}</Text>
                </XStack>
              ))
            )}
          </YStack>

          {/* Financial loans — NEW SECTION */}
          <YStack
            background="$backgroundStrong"
            borderWidth={1}
            borderColor="$borderColor"
            style={{ borderRadius: 12 }}
            p="$4"
          >
            <XStack justify="space-between" items="center" mb="$2">
              <Text fontSize="$2" color="$gray10">
                Loans
              </Text>
              <Text
                fontSize="$2"
                color="$blue10"
                fontWeight="600"
                onPress={editFinancialLoanExpenses}
              >
                Edit
              </Text>
            </XStack>
            {financialLoanItems.length === 0 ? (
              <Text fontSize="$3" color="$gray9">
                No loans added
              </Text>
            ) : (
              financialLoanItems.map((item) => (
                <XStack key={item.name} justify="space-between" mb="$1">
                  <Text fontSize="$3">{item.name}</Text>
                  <Text fontSize="$3">${item.amount.toLocaleString()}</Text>
                </XStack>
              ))
            )}
          </YStack>

          {/* Subscriptions */}
          <YStack
            background="$backgroundStrong"
            borderWidth={1}
            borderColor="$borderColor"
            style={{ borderRadius: 12 }}
            p="$4"
          >
            <XStack justify="space-between" items="center" mb="$2">
              <Text fontSize="$2" color="$gray10">
                Subscriptions
              </Text>
              <Text
                fontSize="$2"
                color="$blue10"
                fontWeight="600"
                onPress={editSubscriptions}
              >
                Edit
              </Text>
            </XStack>
            {subscriptionItems.length === 0 ? (
              <Text fontSize="$3" color="$gray9">
                No subscriptions added
              </Text>
            ) : (
              subscriptionItems.map((item) => (
                <XStack key={item.name} justify="space-between" mb="$1">
                  <Text fontSize="$3">{item.name}</Text>
                  <Text fontSize="$3">${item.amount.toLocaleString()}</Text>
                </XStack>
              ))
            )}
          </YStack>

          <YStack
            mt="$2"
            style={{ borderTopWidth: 1, borderTopColor: "#2A2A28" }}
            pt="$3"
          >
            <XStack justify="space-between" mb="$1">
              <Text fontSize="$3" color="$gray10">
                Total expenses
              </Text>
              <Text fontSize="$3">${totalExpenses.toLocaleString()}</Text>
            </XStack>
            <XStack justify="space-between">
              <Text fontSize="$6" fontWeight="700">
                Money left
              </Text>
              <Text fontSize="$6" fontWeight="700">
                ${moneyLeft.toLocaleString()}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>

      <YStack px="$5">
        <Button
          size="$5"
          style={{ borderRadius: 14 }}
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={submit}
          disabled={isSubmitting}
          opacity={isSubmitting ? 0.5 : 1}
        >
          {isSubmitting ? "Submitting..." : "Submit month"}
        </Button>
      </YStack>
    </YStack>
  );
}
