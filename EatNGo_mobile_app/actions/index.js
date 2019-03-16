export const authLogin = (email, password) => ({
  type: 'AUTH_LOGIN',
  payload: {
    email,
    password,
  },
});

export const authRegister = (email, password) => ({
  type: 'AUTH_REGISTER',
  payload: {
    email,
    password,
  },
});
export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const fetchCuisineTypes = () => ({
  type: 'FETCH_CUISINE_TYPES',
});

export const fetchStore = (id = null) => ({
  type: 'FETCH_STORE',
  payload: {
    id,
  },
});

export const fetchFood = (brandId = null) => ({
  type: 'FETCH_FOOD',
  payload: {
    brandId,
  }
})

export const fetchFoodInfo = (id = null) => ({
  type: 'FETCH_FOOD_INFO',
  payload: {
    id,
  }
})

export const fetchRestaurantByType = (type = null, isFromCuisine = false) => ({
  type: 'FETCH_RESTAURANT_TYPE',
  payload: {
    type,
    isFromCuisine,
  },
});

export const fetchOrders = () => ({
  type: 'FETCH_ORDERS',
});

export const doCancelOrder = () => ({
  type: 'CANCEL_ORDER',
});

export const updateFoodOption = () => ({

})

export const updateFoodQuantity = (quantity) => ({
  type: 'UPDATE_FOOD_QUANTITY',
  payload: {
    quantity
  }
})
export const createOrder = (items, total) => ({
  type: 'CREATE_ORDER',
  payload: {
    items,
    total,
  },
});

