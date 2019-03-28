const initialState = {
	storeList: [],
	page: 1,
	pageSize: 5,
	filteredStoreList: [],
	isLoadingMoreStores: false,
	store: null,
	error: null,
	foodDetail: null,
	isLoadingOrders: false
};

const prune = stores => {
	const ids = {};
	const prunedStores = [];
	stores.forEach(store => {
		if (!ids[store.id]) {
			prunedStores.push(store);
			ids[store.id] = store;
		}
	});
	return prunedStores;
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'IS_LOADING_MORE_STORES':
			return {
				...state,
				isLoadingMoreStores: true,
				error: null
			};
		case 'IS_LOADING_STORES':
			return {
				...state,
				page: 1,
				isLoadingOrders: true,
				filteredStoreList: [],
				storeList: [],
				error: null
			};
		case 'FETCH_STORE_SUCCESS':
			return {
				...state,
				storeList: prune([...state.storeList, ...payload]),
				isLoadingOrders: false,
				filteredStoreList: [...state.filteredStoreList, ...payload],
				page: state.page + 1,
				store: null,
				error: null
			};
		case 'FETCH_MORE_STORES_SUCCESS':
			return {
				...state,
				storeList: prune([...state.storeList, ...payload]),
				isLoadingMoreStores: false,
				filteredStoreList: [...state.filteredStoreList, ...payload],
				page: state.page + 1,
				store: null,
				error: null
			};
		case 'FETCH_MORE_STORES_ERROR':
			return {
				...state,
				storeList: [...state.storeList],
				isLoadingMoreStores: false,
				filteredStoreList: [...state.filteredStoreList],
				store: null,
				error: 'FETCH_MORES_STORE_ERROR'
			};

		case 'SET_STORE_SUCCESS':
			return {
				...state,
				store: payload,
				error: null
			};
		case 'FETCH_STORE_ERROR':
			return {
				...state,
				error: payload
			};
		case 'FETCH_FOOD_SUCCESS':
			return {
				...state,
				foodDetail: payload
			};
		case 'FETCH_FOOD_ERROR':
			return {
				...state,
				foodDetail: null,
				error: payload
			};
		case 'SEARCH_STORE_COMPLETED':
			return {
				...state,
				filteredStoreList: payload,
				error: null
			};
		case 'FETCH_CUISINE_TYPES_SUCCESS':
			return {
				...state,
				cuisineTypes: payload
			};
		case 'SEARCH_STORES_SUCCESS':
			return {
				...state,
				storeList: payload,
				isLoadingMoreStores: false,
				filteredStoreList: payload,
				page: 1,
				store: null,
				error: null
			};
		default:
			return state;
	}
};
