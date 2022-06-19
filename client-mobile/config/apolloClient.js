import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://8d20-2001-448a-1061-5084-f594-2c5a-908e-95ed.ap.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
