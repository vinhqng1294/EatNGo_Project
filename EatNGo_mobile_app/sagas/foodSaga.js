import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../services/food';

const foodSelector = state => state.foodReducer.foodInfo || null;
function* foodByTypeTask(action) {
  try {
    const { payload } = action;

    //   const authToken = yield select(authTokenSelector);

    const res = yield call(API.getStoreFoodGroupByType, payload.brandId);
    if (res.status === 200) {
      yield put({
        type: 'FETCH_FOOD_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_FOOD_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_FOOD_ERROR',
      payload: e.data,
    });
  }
}

function* foodInfoTask(action) {
  try {
    const { payload } = action;

    //   const authToken = yield select(authTokenSelector);    
    const res = yield call(API.getFood, payload.id);
    if (res.status === 200) {
      yield put({
        type: 'FETCH_FOOD_INFO_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_FOOD_INFO_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_FOOD_INFO_ERROR',
      payload: e.data,
    });
  }
}

function* updateFoodQuantityTask(action) {
  try {
    const { payload } = action;
    const currentFood = yield select(foodSelector)
    const newFood = { ...currentFood, quantity: payload.quantity, price: parseFloat(currentFood.originalPrice * payload.quantity).toFixed(2) }
    yield put({
      type: 'UPDATE_FOOD_QUANTITY_SUCCESS',
      payload: newFood,
    });
  } catch (error) {
    console.log(e);
  }

}
function* storeSaga() {
  yield takeLatest('FETCH_FOOD', foodByTypeTask);
  yield takeLatest('FETCH_FOOD_INFO', foodInfoTask);
  yield takeLatest('UPDATE_FOOD_QUANTITY', updateFoodQuantityTask);
}
export default storeSaga