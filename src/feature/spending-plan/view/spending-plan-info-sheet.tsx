import { Modal, Pressable, View } from "react-native";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

interface SpendingPlanInfoSheetProps {
  visible: boolean;
  onClose: () => void;
}

const STEPS = [
  "Split your money left into categories like lunch and going out",
  "Log purchases as you make them",
  "See what's left for each category and each day",
];

export function SpendingPlanInfoSheet({
  visible,
  onClose,
}: SpendingPlanInfoSheetProps) {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: theme.background.val,
        }}
      >
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close spending plan information"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <YStack
          background="$backgroundStrong"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
          }}
          px="$5"
          pt="$4"
          pb="$6"
          gap="$4"
        >
          <YStack
            width={36}
            height={4}
            background="$gray6"
            style={{
              borderRadius: 999,
              alignSelf: "center",
            }}
          />

          <Text fontSize="$7" fontWeight="700">
            What's a spending plan?
          </Text>

          <Text fontSize="$3" color="$gray10" style={{ lineHeight: 22 }}>
            Your money left is what remains after bills, loans, and
            subscriptions. A spending plan splits it into everyday categories so
            you know what you can spend each day.
          </Text>

          <YStack gap="$3">
            {STEPS.map((step, index) => (
              <XStack key={step} gap="$3" items="flex-start">
                <YStack
                  width={26}
                  height={26}
                  background="$blue3"
                  items="center"
                  justify="center"
                  style={{ borderRadius: 13 }}
                >
                  <Text fontSize="$2" fontWeight="600" color="$blue10">
                    {index + 1}
                  </Text>
                </YStack>

                <Text flex={1} fontSize="$3" style={{ lineHeight: 20 }}>
                  {step}
                </Text>
              </XStack>
            ))}
          </YStack>

          <YStack
            background="$background"
            style={{ borderRadius: 10 }}
            px="$3"
            py="$3"
          >
            <Text fontSize="$2" color="$gray10">
              It resets every month. Past months stay in your history.
            </Text>
          </YStack>

          <Button
            size="$5"
            style={{ borderRadius: 14 }}
            background="$blue9"
            color="white"
            fontWeight="700"
            onPress={onClose}
          >
            Got it
          </Button>
        </YStack>
      </View>
    </Modal>
  );
}
