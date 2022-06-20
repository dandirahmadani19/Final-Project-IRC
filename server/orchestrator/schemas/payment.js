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
        const { data } = await axios.post(
          `${process.env.BASE_URL}/payment`,
          {
            amount: dataBalance.amount,
          }
          //   {
          //     headers: {
          //       access_token: AsyncStorage.getItem('access_token'),
          //     },
          //   }
        );
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
    topupBalance: async (_, { dataBalance }) => {
      try {
        const { data } = await axios.post(
          `${process.env.BASE_URL}/payment/success`,
          {
            amount: dataBalance.amount,
          }
          //   {
          //     headers: {
          //       access_token: AsyncStorage.getItem('access_token'),
          //     },
          //   }
        );
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
