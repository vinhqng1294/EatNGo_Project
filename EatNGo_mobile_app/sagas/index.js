import { fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import storeSaga from './storeSaga'
import foodSaga from './foodSaga'
function* rootSaga() {
  yield fork(authSaga);
  yield fork(storeSaga);
  yield fork(foodSaga);
}

export default rootSaga;