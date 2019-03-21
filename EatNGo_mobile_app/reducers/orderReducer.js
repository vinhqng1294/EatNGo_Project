const initialState = {
    orderList: [],
    order: null,
    error: null,
    isLoading: false,
    createdOrder: null
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case 'IS_FETCHING_ORDERS':
      return {
        ...state,
        isLoading: true,
        error: null
      }
      case 'FETCH_ORDERS_SUCCESS':
        return {
          ...state,
          orderList: payload,
          isLoading: false,
          error: null
        }

        case 'FETCH_ORDER_DETAIL_SUCCESS':
        return {
          ...state,
          order: payload,
          error: null
        }
        case 'CREATE_ORDER_SUCCESS':
        return {
          ...state,
          createdOrder: payload,
          error: null
        }
      default:
        return state;
    }
  };