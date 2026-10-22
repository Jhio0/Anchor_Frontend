import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, Text, XStack, YStack, useTheme } from "tamagui";

import { formatMoney } from "@/feature/helper/formatMoney";
import { useCreateSpendingPlanViewModel } from "../viewModel/useCreateSpendingPlanViewModel";

interface CreateSpendingPlanScreenProps {
  collectedExpenseId: string;
  availableToPlan: number;
}

export function CreateSpendingPlanScreen({
  collectedExpenseId,
  availableToPlan,
}: CreateSpendingPlanScreenProps) {
  const vm = useCreateSpendingPlanViewModel(
    collectedExpenseId,
    availableToPlan,
  );
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <YStack
          flex={1}
          background="$background"
          px="$5"
          pt="$8"
          pb="$5"
          justify="space-between"
        >
          <YStack gap="$5">
            <XStack items="center" gap="$1" onPress={vm.goBack}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={18}
                color={theme.gray10.val}
              />
              <Text fontSize="$3" color="$gray10">
                Back
              </Text>
            </XStack>

            <YStack gap="$1">
              <Text fontSize="$8" fontWeight="800" lineHeight="$8">
                Plan your spending money
              </Text>
              <Text fontSize="$3" color="$gray10">
                How much of your money left do you want to set aside for
                everyday spending?
              </Text>
            </YStack>

            <XStack
              items="center"
              justify="space-between"
              background="$blue2"
              borderWidth={1}
              borderColor="$blue5"
              style={{ borderRadius: 12 }}
              px="$4"
              py="$3"
            >
              <Text fontSize="$3" color="$blue10">
                Available to plan
              </Text>
              <Text fontSize="$6" fontWeight="500">
                {formatMoney(vm.availableToPlan)}
              </Text>
            </XStack>

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
                value={vm.amount}
                onChangeText={vm.onAmountChange}
                fontSize="$9"
                fontWeight="700"
                style={{ textAlign: "center" }}
                autoFocus
                color="$gray10"
              />
            </XStack>

            <XStack justify="space-between">
              <Text fontSize="$3" color="$gray10">
                Left unplanned
              </Text>
              <Text
                fontSize="$3"
                fontWeight="500"
                color={vm.isOverAvailable ? "$red10" : "$color"}
              >
                {vm.isOverAvailable
                  ? `-${formatMoney(vm.overBy)}`
                  : formatMoney(vm.leftUnplanned)}
              </Text>
            </XStack>

            {vm.isOverAvailable && (
              <Text fontSize="$3" color="$red10">
                That's {formatMoney(vm.overBy)} more than your money left.
              </Text>
            )}

            {vm.submitError && (
              <Text fontSize="$3" color="$red10">
                Couldn't create your plan. Try again.
              </Text>
            )}
          </YStack>

          <YStack gap="$3">
            <Button
              size="$5"
              style={{ borderRadius: 14 }}
              background="$blue9"
              color="white"
              fontWeight="700"
              onPress={vm.submit}
              disabled={!vm.canSubmit}
              opacity={!vm.canSubmit ? 0.5 : 1}
            >
              {vm.isSubmitting ? "Creating..." : "Create spending plan"}
            </Button>

            <Text fontSize="$2" color="$gray9" style={{ textAlign: "center" }}>
              It resets every month. Past months stay in your history.
            </Text>
          </YStack>
        </YStack>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
