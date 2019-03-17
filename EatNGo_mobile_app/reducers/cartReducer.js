const initialState = {
    cart: [],
  };
  
  export default (state = initialState, { type, payload = {} }) => {
    switch (type) {
      case 'SAVE_NEW_CART':
        return {
          ...state,
          cart: payload,
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
  