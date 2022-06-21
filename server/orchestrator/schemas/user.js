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
    Balance: Balance
  }

  type Balance {
    amount: Int
  }

  type Query {
    getUserProfile(access_token: String): User
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
  Query: {
    getUserProfile: async (_, args) => {
      console.log(args);
      try {
        const { data } = await axios({
          method: "GET",
          url: `${process.env.BASE_URL}/user/user-login`,
          headers: {
            access_token: args.access_token,
          },
        });
        return data;
      } catch ({ response }) {
        return response.data;
      }
    },
  },
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
