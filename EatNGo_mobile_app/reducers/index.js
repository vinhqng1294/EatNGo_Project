import { combineReducers } from 'redux'
import authReducer from './authReducer';

const allReducers = combineReducers({
    authReducer
    // add more reducers here
})
export default allReducers