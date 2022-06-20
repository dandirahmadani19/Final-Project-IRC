import { gql } from "@apollo/client";

export const GET_CROWDFUNDING = gql`
  query GetCrowdFunding {
    getCrowdFunding {
      id
      productName
      UserId
      targetQuantity
      initialProductPrice
      finalProductPrice
      manufactureName
      linkProduct
      status
      currentQuantity
      startDate
      productImage
      initialQuantity
      expiredDay
      hscode
      CrowdFundingProducts {
        UserId
        id
      }
      User {
        lastName
        firstName
        id
      }
    }
  }
`;

export const SUBMIT_CROWDFUNDING = gql`
  mutation SubmitCrowdFunding($dataSubmitCrowFunding: dataSubmitCrowFunding) {
    submitCrowdFunding(dataSubmitCrowFunding: $dataSubmitCrowFunding) {
      message
    }
  }
`;

export const CHECK_BALANCE = gql`
  query CheckBalance($totalPrice: Int, $accessToken: String) {
    checkBalance(totalPrice: $totalPrice, access_token: $accessToken) {
      isEnough
    }
  }
`;

export const HISTORY_SUBMIT = gql`
  query Query($accessToken: String) {
    getHistorySubmitCrowdFunding(access_token: $accessToken) {
      id
      productName
      targetQuantity
      finalProductPrice
      status
      currentQuantity
      startDate
      createdAt
      productImage
      initialQuantity
      expiredDay
      hscode
      CrowdFundingProducts {
        User {
          firstName
          lastName
        }
      }
      User {
        id
        firstName
        lastName
      }
    }
  }
`;

export const USER_APPROVE_CROWDFUNDING = gql`
  mutation Mutation($accessToken: String, $idCrowdFunding: Int) {
    userApproveCrowdFunding(
      access_token: $accessToken
      idCrowdFunding: $idCrowdFunding
    ) {
      message
    }
  }
`;
