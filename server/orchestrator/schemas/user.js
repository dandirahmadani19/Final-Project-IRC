const { gql } = require("apollo-server");
const axios = require("axios");
require("dotenv").config();
const typeDefUser = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    address: String
    phoneNumber: String
    message: String
    access_token: String
  }

  type Query {
    getUser: User
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

const resolverUser = {
  Mutation: {
    login: async (_, { dataUser }) => {
      try {
        const { data } = await axios.post(
          `${process.env.BASE_URL}/user/login`,
          {
            email: dataUser.email,
            password: dataUser.password,
          }
        );
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
  },
};

module.exports = {
  typeDefUser,
  resolverUser,
};
