export const authLogin = (phoneNumber, facebookId) => ({
  type: "AUTH_LOGIN",
  payload: {
    phoneNumber,
    facebookId
  }
});

export const authRegister = (phoneNumber, email, name, facebookId) => ({
  type: "AUTH_REGISTER",
  payload: {
    phoneNumber,
    email,
    name,
    facebookId
  }
});
export const authLogout = () => ({
  type: "AUTH_LOGOUT"
});

export const fetchCuisineTypes = () => ({
  type: "FETCH_CUISINE_TYPES"
});

export const fetchStore = (id = null) => ({
  type: "FETCH_STORE",
  payload: {
    id
  }
});

export const fetchFood = (store = null) => ({
  type: "FETCH_FOOD",
  payload: {
    store
  }
});

export const fetchFoodInfo = (id = null) => ({
  type: "FETCH_FOOD_INFO",
  payload: {
    id
  }
});

export const fetchRestaurantByType = (type = null, isFromCuisine = false) => ({
  type: "FETCH_RESTAURANT_TYPE",
  payload: {
    type,
    isFromCuisine
  }
});

export const fetchOrders = memberId => ({
  type: "FETCH_ORDERS",
  payload: {
    memberId
  }
});

export const fetchOrderById = orderId => ({
  type: "FETCH_ORDER_BY_ID",
  payload: {
    orderId
  }
});


export const doCancelOrder = () => ({
  type: "CANCEL_ORDER"
});



export const updateFoodQuantity = quantity => ({
  type: "UPDATE_FOOD_QUANTITY",
  payload: {
    quantity
  }
});
export const createOrder = (data) => ({
  type: "CREATE_ORDER",
  payload: {
    data
  }
});

export const searchStore = value => ({
  type: "SEARCH_STORE",
  payload: {
    value
  }
});

export const updateCartItems = data => ({
  type: "UPDATE_CART_ITEMS",
  payload: {
    data
  }
});

export const fetchCartItems = () => ({
  type: "FETCH_CART_ITEMS"
});

export const deleteCartItem = item => ({
  type: "DELETE_CART_ITEM",
  payload: item
});
export const cleanCart = () => ({
  type: "CLEAN_CART_ITEMS"
});
export const setSelectedStore = store => ({
  type: "SET_STORE",
  payload: store
});

export const removeCreatedOrder = store => ({
  type: "REMOVE_CREATED_ORDER",
  payload: store
});

export const addCard = (data, memberId) => ({
  type: "ADD_CARD",
  payload: {
    data,
    memberId
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
  },
});



