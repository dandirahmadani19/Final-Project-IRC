import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://90a5-114-122-5-99.ap.ngrok.io",

  cache: new InMemoryCache(),
});

export default client;
