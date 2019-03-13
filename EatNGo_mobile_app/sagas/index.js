import { fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import storeSaga from './storeSaga'
function* rootSaga() {
  yield fork(authSaga);
  yield fork(storeSaga);
}

export default rootSaga;