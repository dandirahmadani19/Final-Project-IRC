import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($dataUser: dataUser) {
    login(dataUser: $dataUser) {
      access_token
      message
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query Query($accessToken: String) {
    getUserProfile(access_token: $accessToken) {
      firstName
      lastName
      email
      address
      phoneNumber
      Balance {
        amount
      }
    }
  }
`;
