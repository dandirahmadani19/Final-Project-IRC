import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://4159-114-122-14-122.ap.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
