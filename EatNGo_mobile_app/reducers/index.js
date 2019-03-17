import { combineReducers } from 'redux'
import authReducer from './authReducer';
import storeReducer from './storeReducer';
import foodReducer from './foodReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
    authReducer,
    storeReducer,
    foodReducer,
    cartReducer
    // add more reducers here
})
export default allReducers