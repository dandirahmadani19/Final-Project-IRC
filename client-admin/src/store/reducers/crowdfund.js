const initialState = {
  crowdFunds : []
}

export default function crowdfundingReducer(state=initialState, action) {
  switch (action.type) {
    case 'setCrowdfundings' : 
      return {crowdFunds : action.payload};
    default :
      return state
  }
}