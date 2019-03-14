import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../services/store';
function* storeTask(action) {
  try {
    const { payload } = action;

    //   const authToken = yield select(authTokenSelector);

    const res = yield call(API.getStore, payload.id);


    if (res.status === 200) {
      if (payload.id === null) {
        yield put({
          type: 'FETCH_STORE_SUCCESS',
          payload: res.data,
        });
      } else {
        yield put({
          type: 'FETCH_STORE_INFO_SUCCESS',
          payload: res.data,
        });
      }
    } else {
      yield put({
        type: 'FETCH_RESTAURANT_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_RESTAURANT_ERROR',
      payload: e.data,
    });
  }
}

function* storeSaga() {
  yield takeLatest('FETCH_STORE', storeTask);
}
export default storeSaga