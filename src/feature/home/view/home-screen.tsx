import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { useHomeViewModel } from "../viewModel/useHomeViewModel";

interface AreaCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
  enabled: boolean;
  onPress?: () => void;
}

function AreaCard({ icon, title, subtitle, enabled, onPress }: AreaCardProps) {
  return (
    <XStack
      items="center"
      gap="$4"
      background="$backgroundStrong"
      p="$4"
      opacity={enabled ? 1 : 0.45}
      onPress={enabled ? onPress : undefined}
      pressStyle={enabled ? { opacity: 0.7 } : undefined}
      style={{
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E2DE",
      }}
    >
      <YStack
        width={48}
        height={48}
        background={enabled ? "$blue3" : "$background"}
        items="center"
        justify="center"
        style={{
          borderRadius: 14,
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={enabled ? "#0C447C" : "#8A8A86"}
        />
      </YStack>

      <YStack flex={1} gap="$1">
        <Text fontSize="$4" fontWeight="600">
          {title}
        </Text>

        <Text fontSize="$3" color="$gray10">
          {subtitle}
        </Text>
      </YStack>

      {enabled && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color="#8A8A86"
        />
      )}
    </XStack>
  );
}

export function HomeScreen() {
  const { hasBudget, isLoading, hasError, openBudget } = useHomeViewModel();

  return (
    <YStack flex={1} background="$background">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 32,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$2" mb="$8">
          <XStack items="center" gap="$2">
            <MaterialCommunityIcons name="anchor" size={18} color="#0C447C" />

            <Text fontSize="$3" fontWeight="600" color="$blue10">
              Stay grounded
            </Text>
          </XStack>

          <Text fontSize="$8" fontWeight="700" letterSpacing={-0.8}>
            Build your foundation.
          </Text>

          <Text fontSize="$4" color="$gray10" lineHeight={24}>
            Keep your finances, habits, and goals moving in the right direction.
          </Text>
        </YStack>

        <YStack gap="$3">
          <Text
            fontSize="$2"
            fontWeight="600"
            color="$gray9"
            textTransform="uppercase"
            letterSpacing={0.8}
          >
            Your areas
          </Text>

          <YStack gap="$3">
            <AreaCard
              icon="piggy-bank-outline"
              title={hasBudget ? "Your Budget" : "Budget"}
              subtitle={
                isLoading
                  ? "Checking your budget..."
                  : hasBudget
                    ? "View your monthly finances"
                    : "Track income and spending"
              }
              enabled={!isLoading}
              onPress={openBudget}
            />

            <AreaCard
              icon="chart-line"
              title="Habits"
              subtitle="Build routines that stick"
              enabled={false}
            />

            <AreaCard
              icon="notebook-outline"
              title="Journal"
              subtitle="Reflect and keep track"
              enabled={false}
            />
          </YStack>
        </YStack>

        <YStack
          mt="$8"
          p="$4"
          background="$backgroundStrong"
          style={{
            borderRadius: 16,
          }}
        >
          <XStack items="center" gap="$3">
            <YStack
              width={36}
              height={36}
              background="$blue3"
              items="center"
              justify="center"
              style={{
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="compass-outline"
                size={19}
                color="#0C447C"
              />
            </YStack>

            <YStack flex={1} gap="$1">
              <Text fontSize="$3" fontWeight="600">
                One step at a time
              </Text>

              <Text fontSize="$2" color="$gray10">
                Small changes create a stronger foundation.
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
