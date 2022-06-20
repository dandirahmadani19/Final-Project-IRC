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
  }

  type Mutation {
    postToken(data: dataToken)
  }
`

const resolverNotification = {
  Mutation: {
    postToken: async (_, {dataToken}) => {
      try {
        const {data} = await axios({
          method : 'POST',
          url : `${process.env.BASE_URL}/notification`,
          data: dataToken,
          Headers : {
            access_token :  "123"
          }
        })
      } catch ({response}) {
        return response.data
      }
    }
  }
}