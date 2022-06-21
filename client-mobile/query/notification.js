import { gql } from "@apollo/client";

export const POST_EXPO_TOKEN = gql`
  mutation Mutation($dataToken: dataToken) {
    postToken(dataToken: $dataToken) {
      tokenAssigned
    }
  }
`;
