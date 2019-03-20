const initialState = {
    orderList: [],
    error: null
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case 'FETCH_ORDERS_SUCCESS':
        return {
          ...state,
          orderList: payload,
          error: null
        }
      default:
        return state;
    }
  };