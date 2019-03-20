import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import API from "../services/orders";

const userSelector = state => state.authReducer.user || null;

function* orderByMemberIdTask(action) {
  try {
    const { payload } = action;

    //   const authToken = yield select(authTokenSelector);
    const res = yield call(API.getOrders);
    console.log(res)
    if (res.status === 200) {
      yield put({
        type: "FETCH_ORDERS_SUCCESS",
        payload: res.data
      });
    } else {
      yield put({
        type: "FETCH_ORDER_INFO_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: "FETCH_ORDER_INFO_ERROR",
      payload: e.data
    });
  }
}


function* orderByIdTask(action) {
  try {
    const { payload } = action;
    //   const authToken = yield select(authTokenSelector);
    
    const res = yield call(API.getOrderById, payload.orderId);
    if (res.status === 200) {
      yield put({
        type: 'FETCH_ORDER_DETAIL_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_ORDER_DETAIL_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_ORDER_DETAIL_ERROR',
      payload: e.data,
    });
  }
}

function* orderSaga() {
    yield takeLatest('FETCH_ORDERS', orderByMemberIdTask)
    yield takeLatest('FETCH_ORDER_BY_ID', orderByIdTask)
}

export default orderSaga;
