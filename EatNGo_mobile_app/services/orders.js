import request from "./request";
import { ORDER_URL, MEMBER_URL } from "./api_constants";
function getOrders(userId, headers) {
  const params = {
    userId
  };
  return request({
    url: MEMBER_URL + `/${userId}/` + 'orders',
    method: "GET",
    params,
    headers
  });
}

function getOrderById(orderId, headers) {
  const params = {
  };
  return request({
    url: ORDER_URL + '/' + orderId,
    method: "GET",
    params,
    headers
  });
}

function createOrder(data, headers) {
  return request({
    url: ORDER_URL,
    method: "POST",
    data,
    headers
  });
}

export default {
  getOrders,
  createOrder,
  getOrderById
};
