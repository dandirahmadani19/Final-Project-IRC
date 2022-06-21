import { api } from "../../api";

export function setCrowdFundings(payload){
  return {
    type : 'setCrowdfundings',
    payload : payload
  }
}

export function setSpesificCrowdFund(payload){
  return {
    type : 'setSpesificCrowdFund',
    payload : payload
  }
}

export function fetchCrowdFundings(){
  return (dispatch, getState) => {

  }
}

export function fetchCrowdFundingById() {
  return (dispatch, getState) => {
    
  }
}

export function verifyCrowdFund() {
  return (dispatch, getState) => {

  }
}

export function rejectCrowdFund() {
  return (dispatch, getState) => {
    
  }
}

