const { gql } = require('apollo-server')
const axios = require('axios')
require('dotenv').config();

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
    postToken(data: dataToken): Response
  }
`

const resolverNotification = {
  Mutation: {
    postToken: async (_, args) => {
      try {
        const {expoToken,access_token} = args
        console.log(args)
        const {data} = await axios({
          method : 'POST',
          url : `${process.env.BASE_URL}/notification`,
          data: {
            expoToken
          },
          Headers : {
            access_token
          }
        })

        return data
      } catch ({response}) {
        return response.data
      }
    }
  }
}

module.exports = {
  typeDefNotification,
  resolverNotification
}