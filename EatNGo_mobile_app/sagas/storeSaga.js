import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import API from '../services/store';
import { changeAlias } from '../utils/index'
const storeListSelector = state => state.storeReducer.storeList || null;
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

function* searchStore(action) {
  const { payload } = action;
  const storeList = yield select(storeListSelector)
  const filteredStoreList = storeList.filter(store => changeAlias(store.name).includes(payload.value))
  yield put({
    type: 'SEARCH_STORE_COMPLETED',
    payload: filteredStoreList,
  });
}
function * setStore(action){
  const { payload } = action;  
  yield put({
    type: 'SET_STORE_SUCCESS',
    payload: payload,
  });
}

function* storeSaga() {
  yield takeLatest('FETCH_STORE', storeTask);
  yield takeLatest('SET_STORE', setStore);
  yield takeEvery('SEARCH_STORE', searchStore);
}
export default storeSaga