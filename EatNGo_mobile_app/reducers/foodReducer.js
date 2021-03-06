const initialState = {
	foods: null,
	foodInfo: null,
	error: null
};
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'FETCH_FOOD_SUCCESS':
		return {
			...state,
			foods: [...payload],
			filteredFoods: [...payload]
		};
		case 'FETCH_FOOD_ERROR':
			return {
				...state,
				foods: null,
				filteredFoods: null,
				error: payload
			};
		case 'FETCH_FOOD_INFO_SUCCESS':
			return {
				...state,
				foodInfo: {
					...payload,
					originalPrice: parseFloat(payload.price).toFixed(2),
					price: (parseFloat(payload.price) * payload.quantity).toFixed(2)
				},
				error: null
			};
		case 'UPDATE_FOOD_SUCCESS':
			return {
				...state,
				foodInfo: payload,
				error: null
			};
		case 'FILTER_FOOD_SUCCESS':
			return {
				...state,
				filteredFoods: [...payload],
				foods: [...state.foods]
			};
		default:
			return state;
	}
};
