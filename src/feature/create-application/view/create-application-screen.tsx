import { Feather } from "@expo/vector-icons";
import { Button, Text, XStack, YStack } from "tamagui";
import { useCreateApplicationViewModel } from "../viewModel/createApplicationViewModel";

export function CreateApplicationScreen() {
  const { create, isCreating } = useCreateApplicationViewModel();

  return (
    <YStack flex={1} background="$background" px="$6" justify="center">
      <YStack items="center" mb="$8">
        <YStack
          width={72}
          height={72}
          style={{ borderRadius: 20 }}
          background="$blue3"
          items="center"
          justify="center"
          mb="$5"
        >
          <Feather name="dollar-sign" size={32} color="#0C447C" />
        </YStack>

        <Text fontSize="$10" fontWeight="800" mb="$3">
          SaveFlow
        </Text>

        <Text
          fontSize="$5"
          color="$gray10"
          style={{ textAlign: "center", lineHeight: 24 }}
        >
          A short monthly check-in that{"\n"}shows what's actually left to
          spend.
        </Text>
      </YStack>

      <YStack
        background="$backgroundStrong"
        borderWidth={1}
        borderColor="$borderColor"
        style={{ borderRadius: 16 }}
        p="$4"
        gap="$3"
        mb="$8"
      >
        <XStack items="center" gap="$3">
          <YStack
            width={32}
            height={32}
            style={{ borderRadius: 10 }}
            background="$blue2"
            items="center"
            justify="center"
          >
            <Feather name="clock" size={16} color="#0C447C" />
          </YStack>
          <Text fontSize="$4" color="$gray11" flex={1}>
            Takes about 3 minutes
          </Text>
        </XStack>

        <XStack
          borderWidth={0}
          style={{ borderTopWidth: 1, borderTopColor: "#2A2A28" }}
        />

        <XStack items="center" gap="$3">
          <YStack
            width={32}
            height={32}
            style={{ borderRadius: 10 }}
            background="$blue2"
            items="center"
            justify="center"
          >
            <Feather name="edit-2" size={16} color="#0C447C" />
          </YStack>
          <Text fontSize="$4" color="$gray11" flex={1}>
            Every answer stays editable later
          </Text>
        </XStack>
      </YStack>

      <Button
        size="$5"
        style={{ borderRadius: 14 }}
        background="$blue9"
        color="white"
        fontWeight="700"
        onPress={create}
        disabled={isCreating}
        opacity={isCreating ? 0.5 : 1}
      >
        {isCreating ? "Starting..." : "Start this month's budget"}
      </Button>

      <Text
        fontSize="$2"
        color="$gray9"
        mt="$4"
        style={{ textAlign: "center" }}
      >
        No account setup, no bank connection.
      </Text>
    </YStack>
  );
}
