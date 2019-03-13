const initialState = {
    storeList: [],
    error: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case 'FETCH_STORE_SUCCESS':      
        return {
          ...state,
          storeList: payload,
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