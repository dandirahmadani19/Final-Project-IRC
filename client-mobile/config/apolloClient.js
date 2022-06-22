import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://8090-114-122-13-39.ap.ngrok.io",

  cache: new InMemoryCache(),
});

export default client;
