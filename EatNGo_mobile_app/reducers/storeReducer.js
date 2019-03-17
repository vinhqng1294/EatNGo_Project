const initialState = {
  storeList: [],
  filteredStoreList: [],
  store: null,
  error: null,
  foodDetail: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_STORE_SUCCESS':
      return {
        ...state,
        storeList: payload,
        filteredStoreList: payload,
        store: null,
        error: null,
      };
    case 'SET_STORE_SUCCESS':
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
    case 'FETCH_FOOD_SUCCESS':
      return {
        ...state,
        foodDetail: payload
      }
    case 'FETCH_FOOD_ERROR':
      return {
        ...state,
        foodDetail: null,
        error: payload
      }
    case 'SEARCH_STORE_COMPLETED':
      return {
        ...state,
        filteredStoreList: payload,
        error: null
      }
    default:
      return state;
  }
};