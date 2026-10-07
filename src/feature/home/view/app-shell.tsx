import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Text, XStack, YStack } from "tamagui";

interface AppShellProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  {
    label: "Home",
    icon: "home-variant-outline",
    activeIcon: "home-variant",
    route: "/screens/home-screen",
  },
  {
    label: "Profile",
    icon: "account-outline",
    activeIcon: "account",
    route: "/screens/profile-screen",
  },
] as const;

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={{ flex: 1 }}>
      <YStack flex={1} background="$background">
        {/* Screen */}
        <YStack flex={1}>{children}</YStack>

        {/* Bottom Navigation */}
        <XStack
          height={72}
          background="$backgroundStrong"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          items="center"
          justify="space-around"
          px="$4"
          pb="$2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.route;

            return (
              <Pressable
                key={item.label}
                onPress={() => {
                  if (!isActive) {
                    router.replace(item.route);
                  }
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <YStack
                  maxW={64}
                  items="center"
                  justify="center"
                  gap="$1"
                  py="$1"
                  style={{
                    borderRadius: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    name={isActive ? item.activeIcon : item.icon}
                    size={22}
                    color={isActive ? "#0C447C" : "#8A8A86"}
                  />

                  <Text
                    fontSize="$2"
                    fontWeight={isActive ? "600" : "400"}
                    color={isActive ? "$blue10" : "$gray10"}
                  >
                    {item.label}
                  </Text>
                </YStack>
              </Pressable>
            );
          })}
        </XStack>
      </YStack>
    </View>
  );
}
