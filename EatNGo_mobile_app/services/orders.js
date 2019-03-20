import request from "./request";
import { ORDER_URL } from "./api_constants";
function getOrders(userId, headers) {
  const params = {
    userId
  };
  return request({
    url: ORDER_URL,
    method: "GET",
    params,
    headers
  });
}

function getOrderById(orderId, headers) {
  console.log(orderId)
  const params = {
  };
  return request({
    url: ORDER_URL+'/'+ orderId,
    method: "GET",
    params,
    headers
  });
}

function createOrder(data, headers) {
  console.log(data);
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
