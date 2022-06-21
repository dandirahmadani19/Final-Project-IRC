import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://4c2b-2001-448a-1061-5084-f447-a8d6-3fe9-44b5.ap.ngrok.io",

  cache: new InMemoryCache(),
});

export default client;
