import { call, put, takeLatest, select } from "redux-saga/effects";
import Auth from "../services/login";

const userSelector = state => state.authReducer.user || null;

function* loginTask(action) {
  try {
    yield put({
      type: "AUTH_LOGIN_LOADING"
    });
    const { payload } = action;
    console.log(payload)
    const res = yield call(
      Auth.doLogin,
      payload.phoneNumber,
      payload.facebookId,
      payload.deviceToken,
    );

    if (res.status === 200) {
      yield put({
        type: "AUTH_LOGIN_SUCCESS",
        payload: res.data
      });
    } else {
      yield put({
        type: "AUTH_LOGIN_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === "string" ? { message: e } : e.data;
    yield put({
      type: "AUTH_LOGIN_ERROR",
      payload
    });
  }
}

function* registerTask(action) {
  try {
    yield put({
      type: "AUTH_REGISTER_LOADING"
    });

    const { payload } = action;

    const res = yield call(
      Auth.doRegister,
      payload.phoneNumber,
      payload.email,
      payload.name,
      payload.facebookId
    );

    if (res.status === 200) {
      yield put({
        type: "AUTH_REGISTER_SUCCESS",
        payload: res.data
      });
    } else {
      yield put({
        type: "AUTH_REGISTER_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === "string" ? { message: e } : e.data;
    yield put({
      type: "AUTH_REGISTER_ERROR",
      payload
    });
  }
}

function* addCard(action) {
  try {
    const { payload } = action;
    const user = yield select(userSelector);
    // yield put({
    //   type: "ADD_CARD_SUCCESS",
    //   payload: payload
    // });
    console.log(user);
    const res = yield call(Auth.addCard, payload.data, user.id);
    if (res.status === 200) {
      yield put({
        type: "ADD_CARD_SUCCESS",
        payload: res.data.card
      });
    } else {
      yield put({
        type: "ADD_CARD_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === "string" ? { message: e } : e.data;
    yield put({
      type: "ADD_CARD_ERROR",
      payload
    });
  }
}

function* logoutTask() {
  try {
    yield put({
      type: "CLEAN_ORDERS"
    });
    yield put({
      type: "AUTH_LOGOUT_SUCCESS"
    });
  } catch (e) {
    yield put({
      type: "AUTH_LOGOUT_RESET"
    });
  }
}

function* updateProfileTask(action) {
  try {
    const { payload } = action;
    const user = yield select(userSelector);

    const res = yield call(
      Auth.updateProfile,
      payload.email,
      payload.name,
      user.id
    );
    console.log(res);
    if (res.status === 200) {
      yield put({
        type: "UPDATE_PROFIE_SUCCESS",
        payload: res.data
      });
    } else {
      yield put({
        type: "UPDATE_PROFILE_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === "string" ? { message: e } : e.data;
    yield put({
      type: "UPDATE_PROFILE_ERROR",
      payload
    });
  }
}

function* uploadAvatarTask(action) {
  try {
    const { payload } = action;
    console.log(payload)
    const user = yield select(userSelector);

    const res = yield call(Auth.uploadAvatar, payload.avatar, user.id);
    console.log(res);
    if (res.status === 200) {
      yield put({
        type: "UPLOAD_AVATAR_SUCCESS",
        payload: res.data
      });
    } else {
      yield put({
        type: "UPLOAD_AVATAR_ERROR",
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === "string" ? { message: e } : e.data;
    yield put({
      type: "UPLOAD_AVATAR_ERROR",
      payload
    });
  }
}

function* authSaga() {
  yield takeLatest("AUTH_LOGIN", loginTask);
  yield takeLatest("AUTH_REGISTER", registerTask);
  yield takeLatest("AUTH_LOGOUT", logoutTask);
  yield takeLatest("ADD_CARD", addCard);
  yield takeLatest("UPDATE_PROFILE_TASK", updateProfileTask);
  yield takeLatest("UPLOAD_AVATAR_TASK", uploadAvatarTask);
}

export default authSaga;
