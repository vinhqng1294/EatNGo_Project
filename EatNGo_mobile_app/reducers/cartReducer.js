const initialState = {
    cart: [],
    promotionCode: null
  };
  
  export default (state = initialState, { type, payload = {} }) => {
    switch (type) {
      case 'SAVE_NEW_CART':
        return {
          ...state,
          cart: payload,
        };
        case 'UPDATE_PROMOTION_SUCCESS':
        return {
          ...state,
          promotionCode: payload
        };
      case 'IN_PROGRESS':
        return {
          ...state,
          inProgress: true,
        };
      default:
        return state;
    }
  };
  