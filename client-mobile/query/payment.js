import { gql } from '@apollo/client';

export const GETURL = gql`
  mutation Mutation($dataBalance: dataBalance) {
    getUrl(dataBalance: $dataBalance) {
      token
      redirect_url
    }
  }
`;

export const TOPUPBALANCE = gql`
  mutation Mutation($dataBalance: dataBalance) {
    topupBalance(dataBalance: $dataBalance) {
      message
    }
  }
`;
