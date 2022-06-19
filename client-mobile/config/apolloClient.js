import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://84fe-114-122-11-51.ap.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
