import { combineReducers } from 'redux'
import authReducer from './authReducer';
import storeReducer  from './storeReducer';

const allReducers = combineReducers({
    authReducer,
    storeReducer
    // add more reducers here
})
export default allReducers