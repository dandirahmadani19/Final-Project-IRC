const { gql } = require("apollo-server");
const axios = require("axios");
require("dotenv").config();
const typeDefCrowdFunding = gql`
  type crowdFunding {
    id: ID
    productName: String
    UserId: Int
    targetQuantity: Int
    initialProductPrice: Int
    finalProductPrice: Int
    manufactureName: String
    linkProduct: String
    status: String
    currentQuantity: Int
    startDate: String
    productImage: String
    initialQuantity: Int
    expiredDay: Int
    createdAt: String
    hscode: String
    CrowdFundingProducts: [crowdProduct]
    User: UserCrowd
  }
  type UserCrowd {
    id: ID
    firstName: String
    lastName: String
  }

  type Message {
    message: String
  }

  type IsEnough {
    isEnough: Boolean
  }

  type crowdProduct {
    id: ID
    UserId: Int
    User: UserCrowd
  }

  type Query {
    getCrowdFunding: [crowdFunding]
    checkBalance(totalPrice: Int, access_token: String): IsEnough
    getHistorySubmitCrowdFunding(access_token: String): [crowdFunding]
  }

  input dataSubmitCrowFunding {
    productName: String
    initialProductPrice: Int
    initialQuantity: Int
    manufactureName: String
    linkProduct: String
    access_token: String
  }

  type Mutation {
    submitCrowdFunding(dataSubmitCrowFunding: dataSubmitCrowFunding): Message
    userApproveCrowdFunding(idCrowdFunding: Int, access_token: String): Message
  }
`;

const resolverCrowdFunding = {
  Query: {
    getCrowdFunding: async () => {
      try {
        const { data } = await axios.get(`${process.env.BASE_URL}/crowdFund`);
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
    checkBalance: async (_, { totalPrice, access_token }) => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${process.env.BASE_URL}/balance/check-balance/${totalPrice}`,
          headers: {
            access_token: access_token,
          },
        });
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
    getHistorySubmitCrowdFunding: async (_, { access_token }) => {
      console.log(access_token);
      try {
        const { data } = await axios({
          method: "GET",
          url: `${process.env.BASE_URL}/crowdFund/all-history-by-user-submit`,
          headers: {
            access_token: access_token,
          },
        });
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
  },
  Mutation: {
    submitCrowdFunding: async (_, { dataSubmitCrowFunding }) => {
      console.log(dataSubmitCrowFunding);
      try {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.BASE_URL}/crowdFund/add`,
          data: {
            productName: dataSubmitCrowFunding.productName,
            initialProductPrice: dataSubmitCrowFunding.initialProductPrice,
            initialQuantity: dataSubmitCrowFunding.initialQuantity,
            manufactureName: dataSubmitCrowFunding.manufactureName,
            linkProduct: dataSubmitCrowFunding.linkProduct,
          },
          headers: {
            access_token: dataSubmitCrowFunding.access_token,
          },
        });
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
    userApproveCrowdFunding: async (_, { idCrowdFunding, access_token }) => {
      try {
        const { data } = await axios({
          method: "PATCH",
          url: `${process.env.BASE_URL}/crowdFund/approve/${idCrowdFunding}`,
          headers: {
            access_token: access_token,
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
  typeDefCrowdFunding,
  resolverCrowdFunding,
};
