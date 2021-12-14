import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";
http.setDeafultCommonHeader("x-auth-token", getJwt());

export async function logout() {
  await http.post(`${apiUrl}/users/logout`);
  localStorage.removeItem(TOKEN_KEY);
}
export function editUser({ _id, ...user }) {
  return http.put(`${apiUrl}/users/myprofile/${_id}/edit`, user);
}
export function deleteUser(id) {
  return http.delete(`${apiUrl}/users/delete/${id}`);
}
export function getCurrentUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(token);
  } catch {
    return null;
  }
}
export function getUser(id) {
  return http.get(`${apiUrl}/users/myprofile/${id}`);
}
export function getUsers(users) {
  return http.get(`${apiUrl}/users/all`, users);
}

async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });

  localStorage.setItem(TOKEN_KEY, data.token);
}
export function createUser(user) {
  return http.post(`${apiUrl}/users`, user);
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

const userSerivce = {
  login,
  getCurrentUser,
  logout,
  getUser,
  getUsers,
  editUser,
  createUser,
  deleteUser,
  getJwt,
};

export default userSerivce;
