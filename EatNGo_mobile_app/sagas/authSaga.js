import { call, put, takeLatest } from 'redux-saga/effects';
import Auth from '../services/login';

function* loginTask(action) {
  try {
    yield put({
      type: 'AUTH_LOGIN_LOADING',
    });
    const { payload } = action;

    const res = yield call(Auth.doLogin, payload.phone, payload.authId);

    if (res.status === 200) {
      yield put({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'AUTH_LOGIN_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? { message: e } : e.data;
    yield put({
      type: 'AUTH_LOGIN_ERROR',
      payload,
    });
  }
}

function* registerTask(action) {
  try {
    yield put({
      type: 'AUTH_REGISTER_LOADING',
    });

    const { payload } = action;

    const res = yield call(Auth.doRegister, payload.phoneNumber, payload.email, payload.name, payload.authId);

    if (res.status === 200) {
      yield put({
        type: 'AUTH_REGISTER_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'AUTH_REGISTER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? { message: e } : e.data;
    yield put({
      type: 'AUTH_REGISTER_ERROR',
      payload,
    });
  }
}

function* logoutTask() {
  try {
    yield put({
      type: 'AUTH_LOGOUT_RESET',
    });
  } catch (e) {
    yield put({
      type: 'AUTH_LOGOUT_RESET',
    });
  }
}

function* authSaga() {
  yield takeLatest('AUTH_LOGIN', loginTask);
  yield takeLatest('AUTH_REGISTER', registerTask);
  yield takeLatest('AUTH_LOGOUT', logoutTask);
}

export default authSaga;
