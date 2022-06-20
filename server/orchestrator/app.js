const { ApolloServer } = require('apollo-server');

const { typeDefUser, resolverUser } = require('./schemas/user');
const {
  typeDefCrowdFunding,
  resolverCrowdFunding,
} = require('./schemas/crowdFunding');
const { typeDefPayment, resolverPayment } = require('./schemas/payment');
const { typeDefNotification, resolverNotification } = require('./schemas/notification');
const server = new ApolloServer({
  typeDefs: [typeDefUser, typeDefCrowdFunding, typeDefPayment, typeDefNotification],
  resolvers: [resolverUser, resolverCrowdFunding, resolverPayment, resolverNotification],
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen(3002).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
