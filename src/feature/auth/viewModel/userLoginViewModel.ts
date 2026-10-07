import { useLazyQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

import { LoginDocument } from "@/network/__generated__/graphql";
import { SESSION_KEY } from "@/network/graphqlClient";

export function useLoginViewModel() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useLazyQuery(LoginDocument);

  const forgotPassword = () => {
    console.log("forgot password tapped"); // stub for now — wire up real flow later
  };

  const submit = async () => {
    if (!email || !password) {
      return;
    }

    const result = await login({
      variables: {
        email,
        password,
      },
    });

    const payload = result.data?.login;

    if (!payload?.sessionId) {
      return;
    }

    await SecureStore.setItemAsync(SESSION_KEY, payload.sessionId);

    router.replace("/screens/home-screen");
  };

  return {
    email,
    password,

    setEmail,
    setPassword,

    submit,
    forgotPassword,
    isLoggingIn: loading,
    loginError: error,
  };
}
