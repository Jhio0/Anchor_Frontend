import { ScrollView } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { useInformationReviewViewModel } from "../viewModel/informationReviewViewModel";

interface Item {
  name: string;
  amount: number;
}

const sumItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

interface SectionCardProps {
  title: string;
  emptyText: string;
  items: Item[];
  subtotal: number;
  onEdit: () => void;
}

function SectionCard({
  title,
  emptyText,
  items,
  subtotal,
  onEdit,
}: SectionCardProps) {
  return (
    <YStack
      background="$backgroundStrong"
      borderWidth={1}
      borderColor="$borderColor"
      style={{ borderRadius: 12 }}
      p="$4"
    >
      <XStack justify="space-between" items="center" mb="$2">
        <Text fontSize="$2" color="$gray10">
          {title}
        </Text>
        <Text fontSize="$2" color="$blue10" fontWeight="600" onPress={onEdit}>
          Edit
        </Text>
      </XStack>

      {items.length === 0 ? (
        <Text fontSize="$3" color="$gray9">
          {emptyText}
        </Text>
      ) : (
        <>
          {items.map((item, index) => (
            <XStack
              key={`${item.name}_${index}`}
              justify="space-between"
              mb="$1"
            >
              <Text fontSize="$3">{item.name}</Text>
              <Text fontSize="$3">${item.amount.toLocaleString()}</Text>
            </XStack>
          ))}

          {/* Section subtotal */}
          <XStack
            justify="space-between"
            mt="$2"
            pt="$2"
            style={{ borderTopWidth: 1, borderTopColor: "#2A2A28" }}
          >
            <Text fontSize="$3" fontWeight="700">
              Total {title.toLowerCase()}
            </Text>
            <Text fontSize="$3" fontWeight="700">
              ${subtotal.toLocaleString()}
            </Text>
          </XStack>
        </>
      )}
    </YStack>
  );
}

export function InformationReviewScreen() {
  const {
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
    editIncome,
    editEssentialExpenses,
    editFinancialLoanExpenses,
    editSubscriptions,
    submit,
    isSubmitting,
  } = useInformationReviewViewModel();

  // Recalculated here from the items themselves
  const essentialTotal = sumItems(essentialItems);
  const loanTotal = sumItems(financialLoanItems);
  const subscriptionTotal = sumItems(subscriptionItems);

  const totalExpenses = essentialTotal + loanTotal + subscriptionTotal;
  const moneyLeft = Number(incomeAmount ?? 0) - totalExpenses;

  return (
    <YStack flex={1} minH={0} background="$background" pt="$8" pb="$5">
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
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
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

          <SectionCard
            title="Expenses"
            emptyText="No expenses added"
            items={essentialItems}
            subtotal={essentialTotal}
            onEdit={editEssentialExpenses}
          />

          <SectionCard
            title="Loans"
            emptyText="No loans added"
            items={financialLoanItems}
            subtotal={loanTotal}
            onEdit={editFinancialLoanExpenses}
          />

          <SectionCard
            title="Subscriptions"
            emptyText="No subscriptions added"
            items={subscriptionItems}
            subtotal={subscriptionTotal}
            onEdit={editSubscriptions}
          />

          {/* Overall totals */}
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
