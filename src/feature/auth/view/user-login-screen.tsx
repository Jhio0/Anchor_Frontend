// feature/login/views/login-screen.tsx
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Text, YStack } from "tamagui";
import { useLoginViewModel } from "../viewModel/userLoginViewModel";

export function LoginScreen() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    submit,
    isLoggingIn,
    loginError,
    forgotPassword,
  } = useLoginViewModel();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <YStack flex={1} background="$background" px="$5" pt="$10" gap="$6">
        <YStack gap="$2">
          <Text fontSize="$9" fontWeight="800">
            Welcome back
          </Text>
          <Text fontSize="$4" color="$gray10">
            Log in to continue to SaveFlow.
          </Text>
        </YStack>

        <YStack gap="$4">
          <YStack gap="$2">
            <Text fontSize="$3" color="$gray10">
              Email
            </Text>
            <Input
              placeholder="name@company.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              size="$5"
              style={{ borderRadius: 12 }}
            />
          </YStack>

          <YStack gap="$2">
            <Text fontSize="$3" color="$gray10">
              Password
            </Text>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              size="$5"
              style={{ borderRadius: 12 }}
            />
          </YStack>

          <Text
            fontSize="$3"
            color="$blue10"
            onPress={forgotPassword}
            style={{ textAlign: "right" }}
          >
            Forgot password?
          </Text>

          {loginError && (
            <Text fontSize="$3" color="$red10">
              That email or password isn't right. Try again.
            </Text>
          )}

          <Button
            size="$5"
            style={{ borderRadius: 14 }}
            background="$blue9"
            color="white"
            fontWeight="700"
            onPress={submit}
            disabled={isLoggingIn}
            opacity={isLoggingIn ? 0.5 : 1}
          >
            {isLoggingIn ? "Logging in..." : "Log in"}
          </Button>
        </YStack>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
