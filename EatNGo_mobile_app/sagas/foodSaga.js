import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import API from '../services/food';

const foodSelector = state => state.foodReducer.foodInfo || null;
const foodListSelector = state => state.foodReducer.foods || null;

function* foodByTypeTask(action) {
	try {
		const { payload } = action;

		const res = yield call(API.getStoreFoodGroupByType, payload.store.brandId);
		if (res.status === 200) {
			yield put({
				type: 'FETCH_FOOD_SUCCESS',
				payload: res.data
			});
		} else {
			yield put({
				type: 'FETCH_FOOD_ERROR',
				payload: res.data
			});
		}
	} catch (e) {
		console.log(e);
		yield put({
			type: 'FETCH_FOOD_ERROR',
			payload: e.data
		});
	}
}

function* foodInfoTask(action) {
	try {
		const { payload } = action;

		//   const authToken = yield select(authTokenSelector);
		const res = yield call(API.getFood, payload.id);
		if (res.status === 200) {
			let food = res.data;
			food.quantity = payload.currentQuantity;
			if (food.attributes) {
				food.attributes.map(attr => {
					attr.options.map((option, index) => {
						if (index === 0) {
							option.isChecked = true;
						} else {
							option.isChecked = false;
						}
						return option;
					});
				});
			}
			yield put({
				type: 'FETCH_FOOD_INFO_SUCCESS',
				payload: food
			});
		} else {
			yield put({
				type: 'FETCH_FOOD_INFO_ERROR',
				payload: res.data
			});
		}
	} catch (e) {
		console.log(e);
		yield put({
			type: 'FETCH_FOOD_INFO_ERROR',
			payload: e.data
		});
	}
}

function* updateFoodQuantityTask(action) {
	try {
		const { payload } = action;
		const currentFood = yield select(foodSelector);
		let optionTotalPrice = 0;
		if (currentFood.attributes && currentFood.attributes.length) {
			currentFood.attributes.map(attr => {
				attr.options.map(item => {
					if (item.isChecked) optionTotalPrice += item.price;
				});
			});
		}
		const newFood = {
			...currentFood,
			quantity: payload.quantity,
			price: (
				(parseFloat(currentFood.originalPrice) + optionTotalPrice) *
				payload.quantity
			).toFixed(2)
		};
		yield put({
			type: 'UPDATE_FOOD_SUCCESS',
			payload: newFood
		});
	} catch (error) {
		console.log(error);
	}
}

function* updateFoodSpecialRequestTask(action) {
	try {
		const { payload } = action;
		const currentFood = yield select(foodSelector);
		const newFood = { ...currentFood, comment: payload.comment };
		yield put({
			type: 'UPDATE_FOOD_SUCCESS',
			payload: newFood
		});
	} catch (error) {
		console.log(error);
	}
}

function* updateFoodOptions(action) {
	try {
		const { payload } = action;
		const { optionIndex, itemIndex } = payload;
		let newFood = {};
		const currentFood = yield select(foodSelector);
		const newAttributes = [...currentFood.attributes];
		let optionTotalPrice = 0;
		if (currentFood.attributes && currentFood.attributes.length) {
			currentFood.attributes.map(attr => {
				attr.options.map(item => {
					if (item.isChecked) optionTotalPrice += item.price;
				});
			});
		}
		for (let i = 0; i < newAttributes[optionIndex].options.length; i++) {
			newAttributes[optionIndex].options[i].isChecked = false;
		}
		newAttributes[optionIndex].options[itemIndex].isChecked = !newAttributes[
			optionIndex
		].options[itemIndex].isChecked;
		const optionPrice = newAttributes[optionIndex].options[itemIndex].price;
		newFood = {
			...currentFood,
			attributes: newAttributes,
			quantity: currentFood.quantity,
			price: (
				(parseFloat(currentFood.originalPrice) + optionTotalPrice) *
					currentFood.quantity +
				optionPrice
			).toFixed(2)
		};
		yield put({
			type: 'UPDATE_FOOD_SUCCESS',
			payload: newFood
		});
	} catch (error) {
		console.log(error);
	}
}

function* filterFoods(action) {
	const { payload } = { ...action };
	const foods = yield select(foodListSelector);
	let filteredFoods = foods.map(({ type, foods }) => ({
		type,
		foods: foods.map(f => ({
			...f
		}))
	}));
	if (payload.filterCuisine) {
		console.log(payload.filterCuisineName);
		filteredFoods = filteredFoods.filter(f => {
			console.log(f);
			return f.type === payload.filterCuisineName;
		});
	}
	if (payload.search && payload.search.trim().length) {
		filteredFoods.forEach(foodType => {
			foodType.foods = foodType.foods.filter(f =>
				f.name.toLowerCase().includes(payload.search.trim().toLowerCase())
			);
		});
	}
	let finalFiltered = [];
	filteredFoods.forEach(type => {
		if (type.foods.length) {
			finalFiltered.push(type);
		}
	});
	yield put({
		type: 'FILTER_FOOD_SUCCESS',
		payload: finalFiltered
	});
}

function* storeSaga() {
	yield takeLatest('FETCH_FOOD', foodByTypeTask);
	yield takeLatest('FETCH_FOOD_INFO', foodInfoTask);
	yield takeEvery('UPDATE_FOOD_QUANTITY', updateFoodQuantityTask);
	yield takeEvery('UPDATE_FOOD_SPECIAL_REQUEST', updateFoodSpecialRequestTask);
	yield takeLatest('UPDATE_FOOD_OPTION', updateFoodOptions);
	yield takeLatest('FILTER_FOOD', filterFoods);
}
export default storeSaga;
