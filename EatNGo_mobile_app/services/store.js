import request from './request';
import { STORE_URL, FOOD_TYPES_URL } from './api_constants';

function getStore(id = null, page, pageSize, headers = null, filterValues = {
  search: '',
  filterCuisine: ''
}) {
	let params = {};
	if (id != null) {
		params = {
			id
		};
  }
  console.log(STORE_URL +
    `?page=${page}&pageSize=${pageSize}&search=${
      filterValues.search || ''
    }&filterCuisine=${filterValues.filterCuisine || ''}`);
	return request({
		url:
			STORE_URL +
			`?page=${page}&pageSize=${pageSize}&search=${
				filterValues.search || ''
			}&filterCuisine=${filterValues.filterCuisine || ''}`,
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
