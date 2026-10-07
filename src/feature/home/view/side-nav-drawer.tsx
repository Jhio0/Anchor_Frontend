// feature/navigation/components/side-nav.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Text, XStack, YStack } from "tamagui";

interface NavItem {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string | null;
  enabled: boolean;
}

interface SideNavProps {
  onClose?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: "home-variant",
    route: "/screens/home-screen",
    enabled: true,
  },
  {
    label: "Budget",
    icon: "piggy-bank-outline",
    route: "/screens/create-application-screen",
    enabled: true,
  },
  {
    label: "Habits",
    icon: "chart-line",
    route: null,
    enabled: false,
  },
  {
    label: "Journal",
    icon: "notebook-outline",
    route: null,
    enabled: false,
  },
];

export function SideNav({ onClose }: SideNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string | null, enabled: boolean) => {
    if (!enabled || !route) return;

    onClose?.();
    router.push(route as any);
  };

  return (
    <YStack
      flex={1}
      background="$backgroundStrong"
      py="$5"
      px="$3"
      justify="space-between"
    >
      <YStack>
        <XStack items="center" gap="$2" mb="$7" px="$2">
          <YStack
            width={28}
            height={28}
            style={{ borderRadius: 8 }}
            background="$blue3"
            items="center"
            justify="center"
          >
            <MaterialCommunityIcons name="anchor" size={16} color="#0C447C" />
          </YStack>

          <Text fontSize="$5" fontWeight="500">
            Anchor
          </Text>
        </XStack>

        <YStack gap="$1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.route === pathname;

            return (
              <XStack
                key={item.label}
                items="center"
                gap="$3"
                py="$3"
                px="$3"
                style={{ borderRadius: 10 }}
                background={isActive ? "$blue2" : "transparent"}
                opacity={item.enabled ? 1 : 0.4}
                onPress={() => handleNavigation(item.route, item.enabled)}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={18}
                  color={isActive ? "#0C447C" : "#8A8A86"}
                />

                <Text
                  fontSize="$4"
                  fontWeight={isActive ? "500" : "400"}
                  color={isActive ? "$blue10" : "$gray10"}
                >
                  {item.label}
                </Text>
              </XStack>
            );
          })}
        </YStack>
      </YStack>

      <XStack
        items="center"
        gap="$3"
        py="$3"
        px="$2"
        borderTopWidth={1}
        borderTopColor="$borderColor"
      >
        <YStack
          width={28}
          height={28}
          style={{ borderRadius: 14 }}
          background="$blue3"
          items="center"
          justify="center"
        >
          <Text fontSize="$2" fontWeight="500" color="$blue10">
            J
          </Text>
        </YStack>

        <Text fontSize="$3" color="$gray10">
          Account
        </Text>
      </XStack>
    </YStack>
  );
}
