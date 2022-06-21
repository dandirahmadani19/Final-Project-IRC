const { gql } = require("apollo-server");
const axios = require("axios");
require("dotenv").config();

const typeDefNotification = gql`
  type TokenData {
    UserId: ID
    expoToken: String
  }

  input dataToken {
    expoToken: String
    access_token: String
  }

  type Response {
    tokenAssigned: Boolean
  }

  type Mutation {
    postToken(dataToken: dataToken): Response
  }
`;

const resolverNotification = {
  Mutation: {
    postToken: async (_, { dataToken }) => {
      try {
        const { expoToken, access_token } = dataToken;
        const { data } = await axios({
          method: "POST",
          url: `${process.env.BASE_URL}/notification`,
          data: {
            expoToken,
          },
          headers: {
            access_token,
          },
        });
        return data;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = {
  typeDefNotification,
  resolverNotification,
};
