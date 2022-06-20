import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  crowdfunding : crowdfundingReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store