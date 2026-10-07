import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import { useCollectIncomeViewModel } from "../viewModels/useCollectIncomeViewModel";

interface CollectIncomeScreenProps {
  applicationId: string;
  editing?: boolean;
  initialIncomeAmount?: string;
  essentialItems?: string;
  financialLoanItems?: string;
  subscriptionItems?: string;
}

export function CollectIncomeScreen({
  applicationId,
  editing = false,
  initialIncomeAmount,
  essentialItems,
  financialLoanItems,
  subscriptionItems,
}: CollectIncomeScreenProps) {
  const { incomeAmount, submit, onIncomeAmountChange, isSubmitting } =
    useCollectIncomeViewModel(applicationId, {
      editing,
      initialIncomeAmount,
      essentialItems,
      financialLoanItems,
      subscriptionItems,
    });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <YStack
        flex={1}
        background="$background"
        px="$5"
        pt="$8"
        pb="$5"
        justify="space-between"
      >
        <YStack gap="$6">
          <Text
            fontSize="$3"
            fontWeight="600"
            color="$gray10"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Step 1 of 4
          </Text>

          <YStack gap="$2">
            <Text fontSize="$9" fontWeight="800" lineHeight="$9">
              What's your income this month?
            </Text>
            <Text fontSize="$4" color="$gray10">
              Enter what you expect to bring in this month.
            </Text>
          </YStack>

          <XStack
            items="center"
            justify="center"
            gap="$2"
            borderWidth={2}
            borderColor="$borderColor"
            style={{ borderRadius: 14 }}
            py="$5"
            px="$4"
            background="$backgroundStrong"
            focusStyle={{ borderColor: "$blue8" }}
          >
            <Text fontSize="$9" fontWeight="700" color="$gray10">
              $
            </Text>
            <Input
              unstyled
              flex={1}
              placeholder="0"
              keyboardType="decimal-pad"
              value={incomeAmount}
              onChangeText={onIncomeAmountChange}
              fontSize="$9"
              fontWeight="700"
              style={{ textAlign: "center" }}
              autoFocus
              color="$gray10"
            />
          </XStack>
        </YStack>

        <Button
          size="$5"
          style={{ borderRadius: 14 }}
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={submit}
          disabled={!incomeAmount || isSubmitting}
          opacity={!incomeAmount || isSubmitting ? 0.5 : 1}
        >
          {isSubmitting
            ? "Saving..."
            : editing
              ? "Save and return to review"
              : "Continue"}
        </Button>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
