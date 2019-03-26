const initialState = {
  orderList: [],
  order: null,
  error: null,
  isLoading: false,
  createdOrder: null,
  isSavingOrder: false
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
        orderList: payload.reverse(),
        createdOrder: null,
        isLoading: false,
        error: null
      }

    case 'CLEAN_ORDERS':
      return {
        ...state,
        orderList: [],
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
        isSavingOrder: false,
        error: null
      }
    case 'REMOVE_CREATED_ORDER_SUCCESS':
      return {
        ...state,
        createdOrder: null,
        error: null
      }
    case 'IS_SAVING_ORDER':
      return {
        ...state,
        isSavingOrder: true,
        error: null
      }
    case 'UPDATE_ORDER_SUCCESS':
      return {
        ...state
      }
    case 'CREATE_ORDER_ERROR':
      return {
        ...state,
        isSavingOrder: false,
        error: payload
      }
    default:
      return state;
  }
};