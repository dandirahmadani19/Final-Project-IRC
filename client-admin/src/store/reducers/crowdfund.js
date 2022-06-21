const initialState = {
  crowdFunds : [],
  crowdFund : {},
  trackingStatus : {}
}

export default function crowdfundingReducer(state=initialState, action) {
  switch (action.type) {
    case 'setCrowdfundings' : 
      return {...state,crowdFunds : action.payload};
    case 'setSpesificCrowdFund' :
      return {...state,crowdFund : action.payload}
    case 'setTrackingStatus' :
      return {...state,trackingStatus : action.payload}
    default :
      return state
  }
}