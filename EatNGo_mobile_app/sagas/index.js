import { fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import storeSaga from "./storeSaga";
import foodSaga from "./foodSaga";
import cartSaga from "./cartSaga";
import orderSaga from "./orderSaga";
function* rootSaga() {
  yield fork(authSaga);
  yield fork(storeSaga);
  yield fork(foodSaga);
  yield fork(cartSaga);
  yield fork(orderSaga);
}

export default rootSaga;
