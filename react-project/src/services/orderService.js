import http from "./httpService";
import { apiUrl } from "../config.json";

export function createOrder(order) {
  return http.post(`${apiUrl}/orders/create`, order);
}

export function getOrders(order) {
  return http.get(`${apiUrl}/orders/all`, order);
}
export function myOrders(order) {
  return http.get(`${apiUrl}/orders/myorders`, order);
}
export function getOrder(id) {
  return http.get(`${apiUrl}/orders/${id}`);
}
export function editOrder({ _id, ...order }) {
  return http.put(`${apiUrl}/orders/edit/${_id}`, order);
}
export function assignOrder(_id) {
  return http.put(`${apiUrl}/orders/complete/${_id}`);
}
export function deleteOrder(id) {
  return http.delete(`${apiUrl}/orders/delete/${id}`);
}

const orderService = {
  createOrder,
  getOrders,
  assignOrder,
  getOrder,
  editOrder,
  myOrders,
  deleteOrder,
};

export default orderService;
