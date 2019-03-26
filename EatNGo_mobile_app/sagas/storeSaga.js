import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import API from '../services/store';
import { changeAlias } from '../utils/index'
import { fetchCartItems } from '../actions';
const storeListSelector = state => state.storeReducer.storeList || null;
const pageSelector = state => state.storeReducer.page || null;
const pageSizeSelector = state => state.storeReducer.pageSize || null;
function* storeTask(action) {
  try {
    yield put({
      type: "IS_LOADING_STORES",
    });
    const { payload } = action;
    const page = yield select(pageSelector)
    const pageSize = yield select(pageSizeSelector)
    const res = yield call(API.getStore, payload.id, page, pageSize);
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

function* fetchMoreStoreTask(action) {
  const page = yield select(pageSelector)
  const pageSize = yield select(pageSizeSelector)
  yield put({
    type: "IS_LOADING_MORE_STORES",
  });
  const res = yield call(API.getStore, null, page, pageSize);
  if (res.status === 200) {
    if (res.data.length) {
      yield put({
        type: 'FETCH_MORE_STORES_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_MORE_STORES_ERROR',
        payload: res.data,
      });
    }
  } else {
    yield put({
      type: 'FETCH_MORE_STORES_ERROR',
      payload: res.data,
    });
  }
}

function* searchStore(action) {
  const { payload } = action;
  const storeList = yield select(storeListSelector)
  const filteredStoreList = storeList.filter(store => changeAlias(store.name).includes(changeAlias(payload.value)))
  yield put({
    type: 'SEARCH_STORE_COMPLETED',
    payload: filteredStoreList,
  });
}
function* setStore(action) {
  const { payload } = action;
  yield put({
    type: 'SET_STORE_SUCCESS',
    payload: payload,
  });
}

function* storeSaga() {
  yield takeLatest('FETCH_STORE', storeTask);
  yield takeLatest('SET_STORE', setStore);
  yield takeLatest('FETCH_MORE_STORES', fetchMoreStoreTask);
  yield takeEvery('SEARCH_STORE', searchStore);
}
export default storeSaga