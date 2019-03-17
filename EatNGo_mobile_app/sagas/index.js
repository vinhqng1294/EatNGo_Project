import { fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import storeSaga from './storeSaga'
import foodSaga from './foodSaga'
import cartSaga from './cartSaga'
function* rootSaga() {
  yield fork(authSaga);
  yield fork(storeSaga);
  yield fork(foodSaga);
  yield fork(cartSaga);
}

export default rootSaga;