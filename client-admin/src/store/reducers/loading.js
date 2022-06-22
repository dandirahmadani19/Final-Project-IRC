const initialState = {
  isLoading : false
}

export default function loadingReducer (state=initialState, action) {
  switch (action.type) {
    case 'setIsLoadingTrue' : 
      return {isLoading:action.payload}
  }
}