const { ApolloServer } = require('apollo-server');

const { typeDefUser, resolverUser } = require('./schemas/user');
const {
  typeDefCrowdFunding,
  resolverCrowdFunding,
} = require('./schemas/crowdFunding');
const { typeDefPayment, resolverPayment } = require('./schemas/payment');
const server = new ApolloServer({
  typeDefs: [typeDefUser, typeDefCrowdFunding, typeDefPayment],
  resolvers: [resolverUser, resolverCrowdFunding, resolverPayment],
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen(3002).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
