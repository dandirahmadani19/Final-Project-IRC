const { ApolloServer } = require("apollo-server");

const { typeDefUser, resolverUser } = require("./schemas/user");
const { typeDefCrowdFunding, resolverCrowdFunding } = require("./schemas/crowdFunding");
const server = new ApolloServer({
  typeDefs: [typeDefUser ,typeDefCrowdFunding],
  resolvers: [resolverUser, resolverCrowdFunding],
  csrfPrevention: true,
  cache: "bounded",
});

server.listen(3002).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
