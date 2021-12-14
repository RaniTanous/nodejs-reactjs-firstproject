import http from "./httpService";
import { apiUrl } from "../config.json";

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}

export function getMyCards(card) {
  return http.get(`${apiUrl}/cards/my-cards`, card);
}

export function getCard(id) {
  return http.get(`${apiUrl}/cards/${id}`);
}
export function editCard({ _id, ...card }) {
  return http.put(`${apiUrl}/cards/${_id}`, card);
}
export function deleteCard(id) {
  return http.delete(`${apiUrl}/cards/${id}`);
}

const cardService = {
  createCard,
  getMyCards,
  getCard,
  editCard,
  deleteCard,
};

export default cardService;
