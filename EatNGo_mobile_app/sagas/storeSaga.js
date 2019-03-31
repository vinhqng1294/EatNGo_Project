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
    let res;
    if (payload.id) {
      res = yield call(API.getStore, payload.id, page, pageSize, null, undefined, payload.currentLocation);
    } else {
      res = yield call(API.getStore, payload.id, page, pageSize, null, payload.filterType, payload.currentLocation);
    }
    if (res.status === 200) {
      yield put({
        type: 'FETCH_STORE_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_STORE_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_STORE_ERROR',
      payload: e.data,
    });
  }
}

function* fetchMoreStoreTask(action) {
  const page = yield select(pageSelector)
  const pageSize = yield select(pageSizeSelector)
  const filterType = action.payload.filterType;
  yield put({
    type: "IS_LOADING_MORE_STORES",
  });

  const res = yield call(API.getStore, null, page, pageSize, null, filterType);
  if (res.status === 200 && res.data.length) {
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
}

function* searchStore(action) {
  const { payload } = action;
  const { value, filterType } = { ...payload };
  const page = 1;
  const pageSize = yield select(pageSizeSelector)
  const res = yield call(API.getStore, null, page, pageSize, null, {
    ...filterType,
    search: value
  });
  if (res.status === 200) {
    yield put({
      type: 'SEARCH_STORES_SUCCESS',
      payload: res.data,
    });
  } else {
    yield put({
      type: 'SEARCH_STORES_ERROR',
      payload: res.data,
    });
  }
  // const storeList = yield select(storeListSelector)
  // const filteredStoreList = storeList.filter(store => changeAlias(store.name).includes(changeAlias(value)))
  // yield put({
  //   type: 'SEARCH_STORE_COMPLETED',
  //   payload: filteredStoreList,
  // });
}
function* setStore(action) {
  const { payload } = action;
  yield put({
    type: 'SET_STORE_SUCCESS',
    payload: payload,
  });
}

function* loadCuisineTypesTask() {
  const res = yield call(API.getCuisineTypes);
  yield put({
    type: 'FETCH_CUISINE_TYPES_SUCCESS',
    payload: res.data
  });
}

function* storeSaga() {
  yield takeLatest('FETCH_STORE', storeTask);
  yield takeLatest('SET_STORE', setStore);
  yield takeLatest('FETCH_MORE_STORES', fetchMoreStoreTask);
  yield takeEvery('SEARCH_STORE', searchStore);
  yield takeEvery('FETCH_CUISINE_TYPES', loadCuisineTypesTask);
}
export default storeSaga