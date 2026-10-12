import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { useCreateApplicationViewModel } from "../viewModel/createApplicationViewModel";

const STEPS = [
  {
    title: "Your income",
    description: "What you earn this month",
  },
  {
    title: "Your expenses, by category",
    description: "Rent, insurance, groceries, phone, plus anything custom",
  },
  {
    title: "Financial loans",
    description: "Monthly loan and debt payments",
  },
  {
    title: "Subscriptions",
    description: "Streaming, apps, and other recurring services",
  },
  {
    title: "Review",
    description: "See exactly what's left to spend",
  },
] as const;

function StepRow({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <XStack items="center" gap="$3">
      <YStack
        width={28}
        height={28}
        style={{ borderRadius: 14 }}
        background="$blue3"
        items="center"
        justify="center"
      >
        <Text fontSize="$2" fontWeight="700" color="$blue10">
          {index}
        </Text>
      </YStack>
      <YStack flex={1}>
        <Text fontSize="$4" fontWeight="600">
          {title}
        </Text>
        <Text fontSize="$2" color="$gray10">
          {description}
        </Text>
      </YStack>
    </XStack>
  );
}

export function CreateApplicationScreen() {
  const { create, isCreating } = useCreateApplicationViewModel();

  return (
    <YStack flex={1} minH={0} background="$background">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <YStack items="center" mb="$6">
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

        {/* What we'll ask */}
        <YStack
          background="$backgroundStrong"
          borderWidth={1}
          borderColor="$borderColor"
          style={{ borderRadius: 16 }}
          p="$4"
          gap="$4"
          mb="$4"
        >
          <Text
            fontSize="$2"
            fontWeight="600"
            color="$gray10"
            textTransform="uppercase"
            letterSpacing={1}
          >
            What we'll ask
          </Text>

          {STEPS.map((step, i) => (
            <StepRow
              key={step.title}
              index={i + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </YStack>

        {/* Reassurance */}
        <YStack
          background="$backgroundStrong"
          borderWidth={1}
          borderColor="$borderColor"
          style={{ borderRadius: 16 }}
          p="$4"
          gap="$3"
          mb="$6"
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
      </ScrollView>
    </YStack>
  );
}
