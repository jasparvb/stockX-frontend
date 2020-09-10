import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "./types";
import StockXApi from "../StockXApi";

/* Actions to handle user registration, login and logout */

function login(data) {
  return async function (dispatch) {
    const user = await StockXApi.login(data);
    dispatch(userLoggedIn(user));
  };
}

function userLoggedIn(user) {
  return { type: LOGIN_USER, payload: user };
}

function register(data) {
  return async function (dispatch) {
    const user = await StockXApi.register(data);
    dispatch(userRegistered(user));
  };
}

function userRegistered(user) {
  return { type: REGISTER_USER, payload: user };
}

function logout() {
  return { type: LOGOUT_USER};
}

export { login, register, logout };