// view/add-category-modal.tsx
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (name: string, amount: number) => void;
}

export function AddCategoryModal({
  visible,
  onClose,
  onConfirm,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const canConfirm =
    name.trim().length > 0 && amount !== "" && Number(amount) > 0;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm(name.trim(), Number(amount));
    setName("");
    setAmount("");
  };

  const handleClose = () => {
    setName("");
    setAmount("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <BlurView intensity={40} tint="dark" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <YStack
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
          pointerEvents="box-none"
        >
          <YStack
            width="100%"
            background="$backgroundStrong"
            style={{ borderRadius: 16 }}
            p="$5"
            gap="$4"
          >
            <Text fontSize="$6" fontWeight="700">
              Add a category
            </Text>

            <YStack gap="$2">
              <Text fontSize="$3" color="$gray10">
                Name
              </Text>
              <Input
                value={name}
                onChangeText={setName}
                size="$5"
                style={{ borderRadius: 12 }}
                autoFocus
              />
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$3" color="$gray10">
                Amount
              </Text>
              <XStack
                items="center"
                borderWidth={1}
                borderColor="$borderColor"
                style={{ borderRadius: 12 }}
                px="$3"
                background="$background"
              >
                <Text fontSize="$5" color="$gray10" mr="$1">
                  $
                </Text>
                <Input
                  unstyled
                  flex={1}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                  fontSize="$5"
                  py="$3"
                  color="$gray10"
                />
              </XStack>
            </YStack>

            <XStack gap="$2" mt="$2">
              <Button
                flex={1}
                size="$5"
                style={{ borderRadius: 14 }}
                background="transparent"
                borderWidth={1}
                borderColor="$borderColor"
                color="$gray10"
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                size="$5"
                style={{ borderRadius: 14 }}
                background="$blue9"
                color="white"
                fontWeight="700"
                onPress={handleConfirm}
                disabled={!canConfirm}
                opacity={!canConfirm ? 0.5 : 1}
              >
                Add
              </Button>
            </XStack>
          </YStack>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
}
