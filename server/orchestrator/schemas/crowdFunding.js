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
    categoryProduct: String
    CrowdFundingProducts: [crowdProduct]
    User: UserCrowd
  }
   type UserCrowd{
     id: ID
     firstName: String
     lastName: String
   }

  type crowdProduct{
    id: ID
    UserId: Int
  }

  type Query {
    getCrowdFunfing: [crowdFunding]
  }

  input dataUser {
    firstName: String
    lastName: String
    email: String!
    password: String!
    address: String
    phoneNumber: String
  }
  
  type Mutation {
    login(dataUser: dataUser): User
  }
`;

const resolverCrowdFunding = {
  Query: {
    getCrowdFunfing: async () => {
      try {
        const { data } = await axios.get(
          `${process.env.BASE_URL}/crowdFund`,
        )
        console.log(data);
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
