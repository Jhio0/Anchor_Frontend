import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

export const SESSION_KEY = "session_id";

const httpLink = new HttpLink({
  uri: "http://192.168.1.163:5000/graphql",
});

const authLink = new SetContextLink(async (prevContext) => {
  const sessionId = await SecureStore.getItemAsync(SESSION_KEY);

  return {
    headers: {
      ...prevContext.headers,
      ...(sessionId && {
        "x-session-id": sessionId,
      }),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
