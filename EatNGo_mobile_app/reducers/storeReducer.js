const initialState = {
  storeList: [],
  store: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_STORE_SUCCESS':
      return {
        ...state,
        storeList: payload,
        store: null,
        error: null,
      };
    case 'FETCH_STORE_INFO_SUCCESS':
      return {
        ...state,
        store: payload,
        error: null,
      };
    case 'FETCH_STORE_ERROR':
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};