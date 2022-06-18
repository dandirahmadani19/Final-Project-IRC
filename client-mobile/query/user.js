import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($dataUser: dataUser) {
    login(dataUser: $dataUser) {
      access_token
      message
    }
  }
`;
