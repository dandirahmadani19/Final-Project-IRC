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

  type crowdProduct {
    id: ID
    UserId: Int
  }

  type Query {
    getCrowdFunding: [crowdFunding]
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
  },
};

module.exports = {
  typeDefCrowdFunding,
  resolverCrowdFunding,
};
