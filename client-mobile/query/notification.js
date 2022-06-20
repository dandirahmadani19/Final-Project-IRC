import { gql } from '@apollo/client'

export const POST_EXPO_TOKEN = gql`
  mutation Mutation($data: dataToken) {
  postToken(data: $data) {
    tokenAssigned
  }
}
`