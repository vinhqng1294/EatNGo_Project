import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import API from '../services/orders';

const userSelector = state => state.authReducer.user || null;

const storeSelector = state => state.storeReducer.store || null;

const promotionSelector = state => state.cartReducer.promotionCode || null;
function* orderByMemberIdTask(action) {
  try {
    yield put({
      type: 'IS_FETCHING_ORDERS'
    });
    const { payload } = action;
    const user = yield select(userSelector);
    const res = yield call(API.getOrders, user.id, {
      Authorization: `Bearer ${user.token}`
    });
    if (res.status === 200) {
      yield put({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: res.data.sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
      });
    } else {
      yield put({
        type: 'FETCH_ORDER_INFO_ERROR',
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_ORDER_INFO_ERROR',
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
        payload: res.data
      });
    } else {
      yield put({
        type: 'FETCH_ORDER_DETAIL_ERROR',
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_ORDER_DETAIL_ERROR',
      payload: e.data
    });
  }
}

function* createOrder(action) {
  try {
    yield put({
      type: 'IS_SAVING_ORDER'
    });
    const user = yield select(userSelector)
    const store = yield select(storeSelector)
    const promotionCode = yield select(promotionSelector)
    const { data } = action.payload;
    const order = {
      storeId: store.id,
      memberId: user.id,
      orderDetails: [],
      promotionCode: promotionCode
    }
    data.map(item => {
      let orderItem = {
        foodId: item.id,
        price: parseFloat(item.originalPrice),
        quantity: item.quantity,
        attributes: item.attributes,
        comment: item.comment
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

function* removeCreatedOrder(action) {
  try {
    yield put({
      type: 'REMOVE_CREATED_ORDER_SUCCESS'
    });
  } catch (e) {
    console.log(e);
  }
}

function* updateOrder(action) {
  const { payload } = action;
  const user = yield select(userSelector);
  const res = yield call(API.updateOrder, payload.orderId, payload.status, {
    Authorization: `Bearer ${user.token}`
  });
  if (res.status === 200) {
    yield put({
      type: 'UPDATE_ORDER_SUCCESS',
      payload: res.data
    });
  } else {
    yield put({
      type: 'UPDATE_ORDER_ERROR',
      payload: res.data
    });
  }
  try {
    yield put({
      type: 'UPDATE_ORDER_SUCCESS'
    });
  } catch (e) {
    console.log(e);
  }
}

function* createReviewOrder(action) {
  const { payload } = action;
  const user = yield select(userSelector);
  const res = yield call(API.createReview, payload.orderId, payload.review, {
    Authorization: `Bearer ${user.token}`
  });
  if (res.status === 200) {
    yield put({
      type: 'CREATE_REVIEW_SUCCESS',
      payload: res.data
    });
  } else {
    yield put({
      type: 'CREATE_REVIEW_ERROR',
      payload: res.data
    });
  }
}

function* fetchOrdersByStoreId(action) {
  try {
    yield put({
      type: "IS_FETCHING_ORDERS",
    });
    const { payload } = action;
    const user = yield select(userSelector);
    const res = yield call(API.getOrdersByStoreId, payload.storeId, {
      Authorization: `Bearer ${user.token}`
    });
    if (res.status === 200) {
      yield put({
        type: "FETCH_ORDERS_SUCCESS",
        payload: res.data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      });
    } else {
      yield put({
        type: "FETCH_ORDERS_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: "FETCH_ORDERS_ERROR",
      payload: e.data
    });
  }
}
function* deleteReviewOrder(action) {
  const { payload } = action;
  const user = yield select(userSelector);
  const res = yield call(API.deleteReview, payload.orderId, {
    Authorization: `Bearer ${user.token}`
  });
  if (res.status === 200) {
    yield put({
      type: 'DELETE_REVIEW_SUCCESS',
      payload: res.data
    });
  } else {
    yield put({
      type: 'DELETE_REVIEW_ERROR',
      payload: res.data
    });
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', orderByMemberIdTask)
  yield takeLatest('FETCH_ORDER_BY_ID', orderByIdTask)
  yield takeLatest('CREATE_ORDER', createOrder)
  yield takeLatest('REMOVE_CREATED_ORDER', removeCreatedOrder)
  yield takeLatest('UPDATE_ORDER', updateOrder)
  yield takeLatest('FETCH_STORE_ORDERS', fetchOrdersByStoreId)
  yield takeLatest('CREATE_REVIEW', createReviewOrder);
  yield takeLatest('DELETE_REVIEW', deleteReviewOrder);
}


export default orderSaga;
