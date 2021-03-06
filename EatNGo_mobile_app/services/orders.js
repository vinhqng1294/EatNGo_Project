import request from "./request";
import { ORDER_URL, MEMBER_URL, STORE_URL } from "./api_constants";
function getOrders(userId, headers) {
	const params = {
		userId
	};
	return request({
		url: MEMBER_URL + `/${userId}/` + 'orders',
		method: 'GET',
		params,
		headers
	});
}

function getOrderById(orderId, headers) {
	const params = {};
	return request({
		url: ORDER_URL + '/' + orderId,
		method: 'GET',
		params,
		headers
	});
}

function getOrdersByStoreId(storeId, headers) {
	const params = {
	};
	return request({
		url: STORE_URL + '/' + storeId + '/orders',
		method: "GET",
		params,
		headers
	});
}

function createOrder(data, headers) {
	return request({
		url: ORDER_URL,
		method: 'POST',
		data,
		headers
	});
}

function updateOrder(orderId, status, headers) {
	const data = {
		status
	};
	return request({
		url: ORDER_URL + '/' + orderId,
		method: "PATCH",
		data,
		headers
	});
}

function createReview(orderId, data, headers) {
	return request({
		url: `${ORDER_URL}/${orderId}/reviews`,
		method: 'POST',
		data,
		headers
	});
}

function updateReview(orderId, data, headers) {
	return request({
		url: `${ORDER_URL}/${orderId}/reviews`,
		method: 'PUT',
		data,
		headers
	});
}

function deleteReview(orderId, headers) {
	return request({
		url: `${ORDER_URL}/${orderId}/reviews`,
		method: 'DELETE',
		headers
	});
}

function getStoreOrders(storeId, headers) {
	return request({
		url: `${STORE_URL}/${storeId}/orders`,
		headers
	});
}

export default {
	getOrders,
	createOrder,
	getOrderById,
	updateOrder,
	getOrdersByStoreId,
	createReview,
	updateReview,
	deleteReview,
	getStoreOrders

}
