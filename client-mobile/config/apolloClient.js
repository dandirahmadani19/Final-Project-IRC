import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://ac67-2001-448a-1060-12af-45a7-58b8-9b2d-d95c.ap.ngrok.io",

  cache: new InMemoryCache(),
});

export default client;
