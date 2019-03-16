import { combineReducers } from 'redux'
import authReducer from './authReducer';
import storeReducer from './storeReducer';
import foodReducer from './foodReducer';

const allReducers = combineReducers({
    authReducer,
    storeReducer,
    foodReducer
    // add more reducers here
})
export default allReducers