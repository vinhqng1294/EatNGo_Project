import request from './request';
import { STORE_URL, FOOD_TYPES_URL } from './api_constants';
import queryString from 'query-string';

function getStore(
	id = null,
	page,
	pageSize,
	headers = null,
	filterValues = {
		search: '',
		filterCuisine: ''
	},
	currentLocation = {}
) {
	let params = {};
	if (id != null) {
		params = {
			id
		};
	}
	const query = queryString.stringify({
		page,
		pageSize,
		search: filterValues.search || '',
		filterCuisine: filterValues.filterCuisine || '',
		...currentLocation
	});
	return request({
		url: `${STORE_URL}?${query}`,
		method: 'GET',
		params,
		headers,
		message: 'from here'
	});
}

function getCuisineTypes() {
	return request({
		url: FOOD_TYPES_URL
	});
}

export default {
	getStore,
	getCuisineTypes
};
