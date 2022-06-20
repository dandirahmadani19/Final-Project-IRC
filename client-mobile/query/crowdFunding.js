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
