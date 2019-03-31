export const authLogin = (phoneNumber, facebookId, deviceToken) => ({
	type: 'AUTH_LOGIN',
	payload: {
		phoneNumber,
		facebookId,
		deviceToken
	}
});

export const authRegister = (phoneNumber, email, name, facebookId, deviceToken) => ({
	type: 'AUTH_REGISTER',
	payload: {
		phoneNumber,
		email,
		name,
		facebookId,
		deviceToken
	}
});
export const authLogout = () => ({
	type: 'AUTH_LOGOUT'
});

export const updateUserProfile = (email, name, id) => ({
  type: "UPDATE_PROFILE_TASK",
  payload: {
    email,
    name,
    id
  }
});

export const uploadAvatar = (avatar, id) => ({
  type: "UPLOAD_AVATAR_TASK",
  payload: {
    avatar,
    id
  }
});

export const fetchCuisineTypes = () => ({
	type: 'FETCH_CUISINE_TYPES'
});

export const fetchStore = (id = null, filterType, currentLocation) => ({
	type: 'FETCH_STORE',
	payload: {
		id,
		filterType,
		currentLocation
	}
});

export const fetchMoreStores = filterType => ({
	type: "FETCH_MORE_STORES",
	payload: {
		filterType
	}
});

export const fetchFood = (store = null) => ({
	type: 'FETCH_FOOD',
	payload: {
		store
	}
});

export const filterFoods = (search, filterCuisine, filterCuisineName) => ({
	type: 'FILTER_FOOD',
	payload: {
		search,
		filterCuisine,
		filterCuisineName
	}
});

export const fetchFoodInfo = (id = null, currentQuantity = 1) => ({
  type: "FETCH_FOOD_INFO",
  payload: {
    id,
    currentQuantity
  }
});

export const fetchRestaurantByType = (type = null, isFromCuisine = false) => ({
	type: 'FETCH_RESTAURANT_TYPE',
	payload: {
		type,
		isFromCuisine
	}
});

export const fetchOrders = memberId => ({
	type: 'FETCH_ORDERS',
	payload: {
		memberId
	}
});


export const fetchOrdersByStoreId = storeId => ({
  type: "FETCH_STORE_ORDERS",
  payload: {
    storeId
  }
});

export const fetchOrderById = orderId => ({
	type: 'FETCH_ORDER_BY_ID',
	payload: {
		orderId
	}
});

export const doCancelOrder = () => ({
	type: 'CANCEL_ORDER'
});

export const updateFoodQuantity = quantity => ({
	type: 'UPDATE_FOOD_QUANTITY',
	payload: {
		quantity
	}
});

export const updateFoodSpecialRequest = comment => ({
	type: 'UPDATE_FOOD_SPECIAL_REQUEST',
	payload: {
		comment
	}
});

export const createOrder = data => ({
	type: 'CREATE_ORDER',
	payload: {
		data
	}
});

export const searchStore = (value, filterType) => ({
	type: 'SEARCH_STORE',
	payload: {
		value,
		filterType
	}
});

export const updateCartItems = (data, isModified) => ({
  type: "UPDATE_CART_ITEMS",
  payload: {
    data,
    isModified
  }
});

export const fetchCartItems = () => ({
	type: 'FETCH_CART_ITEMS'
});

export const deleteCartItem = item => ({
	type: 'DELETE_CART_ITEM',
	payload: item
});
export const cleanCart = () => ({
	type: 'CLEAN_CART_ITEMS'
});
export const setSelectedStore = store => ({
	type: 'SET_STORE',
	payload: store
});

export const removeCreatedOrder = store => ({
	type: 'REMOVE_CREATED_ORDER',
	payload: store
});

export const addCard = (data, memberId) => ({
	type: 'ADD_CARD',
	payload: {
		data,
		memberId
	}
});

export const updatePromotion = (promotionCode) => ({
  type: "UPDATE_PROMOTION",
  payload: {
    promotionCode
  }
});


export const updateOrder = (orderId, status) => ({
  type: "UPDATE_ORDER",
  payload: {
    orderId,
    status
  }
});

export const updateFoodOption = (optionIndex, itemIndex) => ({
	type: 'UPDATE_FOOD_OPTION',
	payload: {
		optionIndex,
		itemIndex
	}
});

export const createReview = (orderId, review) => ({
	type: 'CREATE_REVIEW',
	payload: {
		orderId,
		review
	}
});

export const deleteReview = orderId => ({
	type: 'DELETE_REVIEW',
	payload: {
		orderId
	}
});
