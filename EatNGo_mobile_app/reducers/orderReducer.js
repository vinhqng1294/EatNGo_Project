const initialState = {
    orderList: [],
    order: null,
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

        case 'FETCH_ORDER_DETAIL_SUCCESS':
        return {
          ...state,
          order: payload,
          error: null
        }
      default:
        return state;
    }
  };