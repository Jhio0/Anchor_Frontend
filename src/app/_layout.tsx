import { ApolloProvider } from "@apollo/client/react";
import { Slot } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { TamaguiProvider, Theme } from "tamagui";

import { DashboardRefreshProvider } from "@/feature/collected-expense-data-dashboard/view/dashboard-refresh";
import { AppShell } from "@/feature/home/view/app-shell";
import { client } from "@/network/graphqlClient";
import tamaguiConfig from "../tamagui.config";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
          <Theme name="dark">
            <SafeAreaProvider>
              <DashboardRefreshProvider>
                <SafeAreaView
                  style={{
                    flex: 1,
                    backgroundColor: "#000",
                  }}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                      <AppShell>
                        <Slot />
                      </AppShell>
                    </View>
                  </TouchableWithoutFeedback>
                </SafeAreaView>
              </DashboardRefreshProvider>
            </SafeAreaProvider>
          </Theme>
        </TamaguiProvider>
      </ApolloProvider>

      <Toast />
    </GestureHandlerRootView>
  );
}
