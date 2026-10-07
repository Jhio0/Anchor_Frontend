// view/expense-screen.tsx
import { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import { ExpenseCategory } from "../model/expense";
import { AddCategoryModal } from "./add-category-modal";

export interface ExpensesScreenProps {
  stepLabel: string;
  title: string;
  categories: ExpenseCategory[];
  onToggleCategory: (id: string) => void;
  onAmountChange: (id: string, value: string) => void;
  onAddCustomCategory: (name: string, amount: number) => void;
  onRemoveCategory: (id: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  submitLabel?: string;
}

export function ExpensesScreen({
  stepLabel,
  title,
  categories,
  onToggleCategory,
  onAmountChange,
  onAddCustomCategory,
  onRemoveCategory,
  onSubmit,
  canSubmit,
  submitLabel = "Continue",
}: ExpensesScreenProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

  const handleConfirmAdd = (name: string, amount: number) => {
    onAddCustomCategory(name, amount);
    setIsAddModalOpen(false);
  };

  const handleRemove = (id: string) => {
    swipeableRefs.current[id]?.close();
    onRemoveCategory(id);
  };

  const renderRightAction = (id: string) => (
    <XStack
      width={64}
      items="center"
      justify="center"
      background="$red9"
      style={{ borderRadius: 12 }}
      ml="$2"
      onPress={() => handleRemove(id)}
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
      <YStack gap="$4" px="$5">
        <Text
          fontSize="$3"
          fontWeight="600"
          color="$gray10"
          textTransform="uppercase"
          letterSpacing={1}
        >
          {stepLabel}
        </Text>
        <Text fontSize="$8" fontWeight="800" lineHeight="$8">
          {title}
        </Text>
      </YStack>

      <ScrollView
        style={{ flex: 1, marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$2">
          {categories.map((category) => (
            <Swipeable
              key={category.id}
              ref={(ref) => {
                swipeableRefs.current[category.id] = ref;
              }}
              renderRightActions={() => renderRightAction(category.id)}
              overshootRight={false}
            >
              <XStack
                items="center"
                justify="space-between"
                py="$3"
                px="$4"
                style={{ borderRadius: 12 }}
                background={
                  category.enabled ? "$backgroundStrong" : "transparent"
                }
                borderWidth={1}
                borderColor={category.enabled ? "$blue5" : "transparent"}
                onPress={() => onToggleCategory(category.id)}
              >
                <XStack items="center" gap="$3">
                  <YStack
                    width={18}
                    height={18}
                    style={{ borderRadius: 4 }}
                    borderWidth={category.enabled ? 0 : 1}
                    borderColor="$borderColor"
                    background={category.enabled ? "$blue9" : "transparent"}
                    items="center"
                    justify="center"
                  >
                    {category.enabled && (
                      <Text color="white" fontSize="$1" fontWeight="700">
                        ✓
                      </Text>
                    )}
                  </YStack>
                  <Text
                    fontSize="$4"
                    color={category.enabled ? "$color" : "$gray10"}
                  >
                    {category.name}
                  </Text>
                </XStack>

                {category.enabled && (
                  <XStack items="center" gap="$1">
                    <Text fontSize="$4" fontWeight="600" color="$gray10">
                      $
                    </Text>
                    <Input
                      unstyled
                      width={80}
                      placeholder="0"
                      keyboardType="decimal-pad"
                      value={category.amount ?? ""}
                      onChangeText={(value) =>
                        onAmountChange(category.id, value)
                      }
                      fontSize="$4"
                      fontWeight="600"
                      style={{ textAlign: "right" }}
                      color="$gray10"
                    />
                  </XStack>
                )}
              </XStack>
            </Swipeable>
          ))}

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
              + Add custom category
            </Text>
          </XStack>

          <Text
            fontSize="$2"
            color="$gray9"
            mt="$3"
            style={{ textAlign: "center" }}
          >
            Tip: swipe left on a category to remove it
          </Text>
        </YStack>
      </ScrollView>

      <YStack px="$5">
        <Button
          size="$5"
          style={{ borderRadius: 14 }}
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={onSubmit}
          disabled={!canSubmit}
          opacity={!canSubmit ? 0.5 : 1}
        >
          {submitLabel}
        </Button>
      </YStack>

      <AddCategoryModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />
    </YStack>
  );
}
