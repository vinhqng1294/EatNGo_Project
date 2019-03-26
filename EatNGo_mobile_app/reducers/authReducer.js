import { AsyncStorage } from "react-native";
const initialState = {
  loginError: null,
  loginLoading: false,
  user: null,
  registerLoading: false,
  registerError: null,
  registerMessage: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUTH_LOGIN_LOADING":
      return {
        ...state,
        loginLoading: true
      };
    case "AUTH_LOGIN_SUCCESS":
      AsyncStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        loginLoading: false,
        loginError: null,
        user: payload
      };
    case "AUTH_LOGIN_ERROR":
      return {
        ...state,
        loginLoading: false,
        loginError: payload,
        user: null
      };
    case "AUTH_REGISTER_LOADING":
      return {
        ...state,
        registerLoading: true
      };
    case "AUTH_REGISTER_SUCCESS":
      AsyncStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        registerLoading: false,
        registerError: null,
        user: payload
      };
    case "AUTH_REGISTER_ERROR":
      return {
        ...state,
        registerError: payload,
        registerLoading: false,
        registerMessage: null
      };
    case "AUTH_LOGOUT_RESET":
      return initialState;
    case "ADD_CARD_SUCCESS":
      return {
        ...state,
        user: { ...state.user, card: payload }
      };
    case "AUTH_LOGOUT_SUCCESS":
      AsyncStorage.removeItem("user");
      return {
        ...state,
        user: null
      };
    case "UPDATE_PROFIE_SUCCESS":
      return {
        ...state,
        user: {...state.user, email: payload.email, name: payload.name}
      };
    case "UPLOAD_AVATAR_SUCCESS":
      return {
        ...state,
        user: {...state.user, avatar: payload.avatar}
      };
    default:
      return state;
  }
};
