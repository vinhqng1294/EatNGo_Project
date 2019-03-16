import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../services/food';

const foodSelector = state => state.foodReducer.food || null;
function* foodTask(action) {
  try {
    const { payload } = action;

    //   const authToken = yield select(authTokenSelector);

    const res = yield call(API.getFood, payload.id);
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

function* updateFoodQuantityTask(action) {
  try {
    const { payload } = action;
    const currentFood = yield select(foodSelector)
    const newFood = { ...currentFood, quantity: payload.quantity, price: (currentFood.price * (payload.quantity)) }
    yield put({
      type: 'UPDATE_FOOD_QUANTITY_SUCCESS',
      payload: newFood,
    });
  } catch (error) {
    console.log(e);
  }

}
function* storeSaga() {
  yield takeLatest('FETCH_FOOD', foodTask);
  yield takeLatest('UPDATE_FOOD_QUANTITY', updateFoodQuantityTask);
}
export default storeSaga