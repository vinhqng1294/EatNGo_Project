import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import API from "../services/orders";

const userSelector = state => state.authReducer.user || null;

const storeSelector = state => state.storeReducer.store || null;

function* orderByMemberIdTask(action) {
  try {
    yield put({
      type: "IS_FETCHING_ORDERS",      
    });
    const { payload } = action;
    const user = yield select(userSelector);
    const res = yield call(API.getOrders, user.id, {
      Authorization: `Bearer ${user.token}`
    });
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

function* createOrder(action) {
  try {
    const user = yield select(userSelector)
    const store = yield select(storeSelector)
    const { data } = action.payload;
    const order = {
      storeId: store.id,
      memberId: user.id,
      orderDetails: [],
    }
    data.map(item => {
      let orderItem = {
        foodId: item.id,
        price: parseFloat(item.originalPrice),
        quantity: item.quantity,
        attributes: item.attributes
      }
      order.orderDetails.push(orderItem)
    })

    // const authToken = yield select(authTokenSelector);
    const res = yield call(API.createOrder, order, {
      Authorization: `Bearer ${user.token}`
    });
    if (res.status === 200) {
      yield put({
        type: 'CREATE_ORDER_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'CREATE_ORDER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'CREATE_ORDER_ERROR',
      payload: e.data,
    });
  }
}



function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', orderByMemberIdTask)
  yield takeLatest('FETCH_ORDER_BY_ID', orderByIdTask)
  yield takeLatest('CREATE_ORDER', createOrder)
}

export default orderSaga;
