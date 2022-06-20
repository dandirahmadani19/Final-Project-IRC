import { gql } from "@apollo/client";

export const GET_CROWDFUNDING = gql`
  query GetCrowdFunfing {
    getCrowdFunfing {
      id
      productName
      UserId
      targetQuantity
      initialProductPrice
      finalProductPrice
      manufactureName
      status
      linkProduct
      currentQuantity
      startDate
      productImage
      initialQuantity
      expiredDay
      hscode
      CrowdFundingProducts {
        id
        UserId
      }
      User {
        id
        firstName
        lastName
      }
    }
  }
`;
