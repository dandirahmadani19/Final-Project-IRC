const { gql } = require('apollo-server');
const axios = require('axios');
require('dotenv').config();
const typeDefPayment = gql`
  type Balance {
    id: ID
    UserId: Int
    amount: Int
  }
  type Url {
    token: String
    redirect_url: String
  }
  type Message {
    message: String
  }
  input dataBalance {
    amount: Int
    access_token: String
  }
  type Mutation {
    getUrl(dataBalance: dataBalance): Url
    topupBalance(dataBalance: dataBalance): Message
  }
`;

const resolverPayment = {
  Mutation: {
    getUrl: async (_, { dataBalance }) => {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${process.env.BASE_URL}/payment`,
          data: {
            addAmount: dataBalance.amount + 3000,
          },
          headers: {
            access_token: dataBalance.access_token,
          },
        });
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
    topupBalance: async (_, { dataBalance }) => {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${process.env.BASE_URL}/payment/success`,
          data: {
            addAmount: dataBalance.amount,
          },
          headers: {
            access_token: dataBalance.access_token,
          },
        });
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
  },
};
module.exports = {
  typeDefPayment,
  resolverPayment,
};
