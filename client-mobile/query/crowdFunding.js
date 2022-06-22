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
      updatedAt
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
      initialProductPrice
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

export const USER_JOIN_CROWDFUNDING = gql`
  mutation UserJoinCrowdFunding(
    $accessToken: String
    $totalPrice: Int
    $quantityToBuy: Int
    $idCrowdFunding: Int
  ) {
    userJoinCrowdFunding(
      access_token: $accessToken
      totalPrice: $totalPrice
      quantityToBuy: $quantityToBuy
      idCrowdFunding: $idCrowdFunding
    ) {
      message
      status
    }
  }
`;

export const HISTORY_JOIN = gql`
  query Query($accessToken: String) {
    getHistoryJoinCrowdFunding(access_token: $accessToken) {
      UserId
      id
      totalPrice
      quantityToBuy
      createdAt
      CrowdFunding {
        id
        productName
        UserId
        targetQuantity
        initialProductPrice
        finalProductPrice
        linkProduct
        status
        currentQuantity
        startDate
        productImage
        initialQuantity
        expiredDay
        createdAt
        hscode
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

export const GET_STATUS_TRACKING = gql`
  query GetStatusTracking($idCrowdFunding: Int) {
    getStatusTracking(idCrowdFunding: $idCrowdFunding) {
      id
      status
      description
      createdAt
      message
    }
  }
`;

export const DENY_CROWDFUNDING = gql`
  mutation UserJoinCrowdFunding(
    $accessToken: String
    $totalPrice: Int
    $quantityToBuy: Int
    $idCrowdFunding: Int
  ) {
    userJoinCrowdFunding(
      access_token: $accessToken
      totalPrice: $totalPrice
      quantityToBuy: $quantityToBuy
      idCrowdFunding: $idCrowdFunding
    ) {
      message
      status
    }
  }
`;
