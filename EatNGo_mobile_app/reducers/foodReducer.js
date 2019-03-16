const initialState = {
  foods: null,
  foodDetails: null,
  foodItem: null,
  error: null,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_FOOD_SUCCESS':
      return {
        ...state,
        foods: payload,
        foodItem: payload
      }
    case 'FETCH_FOOD_ERROR':
      return {
        ...state,
        foods: null,
        error: payload
      }
    case 'UPDATE_FOOD_QUANTITY_SUCCESS':
      return {
        ...state,
        foodItem: payload,
        error: null,
      }
    default:
      return state;
  }
};  