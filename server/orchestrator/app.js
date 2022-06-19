const { ApolloServer } = require("apollo-server");

const { typeDefUser, resolverUser } = require("./schemas/user");
const server = new ApolloServer({
  typeDefs: [typeDefUser],
  resolvers: [resolverUser],
  csrfPrevention: true,
  cache: "bounded",
});

server.listen(3002).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
