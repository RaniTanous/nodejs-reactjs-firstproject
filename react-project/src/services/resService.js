import http from "./httpService";
import { apiUrl } from "../config.json";

export function createRestaurant(restaurant) {
  return http.post(`${apiUrl}/restaurants/create`, restaurant);
}

export function getRestaurants(restaurant) {
  return http.get(`${apiUrl}/restaurants/all`, restaurant);
}

export function getRestaurant(id) {
  return http.get(`${apiUrl}/restaurants/${id}`);
}
export function editRestaurant({ _id, ...restaurant }) {
  return http.put(`${apiUrl}/restaurants/edit/${_id}`, restaurant);
}
export function deleteRestaurant(id) {
  return http.delete(`${apiUrl}/restaurants/delete/${id}`);
}

const resService = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  editRestaurant,
  deleteRestaurant,
};

export default resService;
