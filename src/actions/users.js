import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, UPDATE_USER } from "./types";
import StockXApi from "../StockXApi";
import { addAlert } from './alerts';

/* Actions to handle user registration, login and logout */

function login(data) {
  return async function (dispatch) {
    const user = await StockXApi.login(data);
    await dispatch(userLoggedIn(user));
    await dispatch(addAlert(`Welcome ${data.username}!`, "success"));
  };
}

function userLoggedIn(user) {
  return { type: LOGIN_USER, payload: user };
}

function register(data) {
  return async function (dispatch) {
    const user = await StockXApi.register(data);
    dispatch(userRegistered(user));
    dispatch(addAlert(`Welcome ${data.username}!`, "success"));
  };
}

function updateUserApi(username, data) {
  return async function (dispatch) {
    try {
      const user = await StockXApi.updateUser(username, data);
      dispatch(userUpdated(user));
      dispatch(addAlert(`User info update!`, "success"));
    } catch(err) {
      err.forEach(e => {
        dispatch(addAlert(e, "danger"));
      });
    }
  };
}

function deleteUserApi(username, token) {
  return async function (dispatch) {
    try {
      const message = await StockXApi.deleteUser(username, token);
      await dispatch(logout());
      dispatch(addAlert(message, "success"));
    } catch(err) {
      err.forEach(e => {
        dispatch(addAlert(e, "danger"));
      });
    }
  };
}

function userUpdated(user) {
  return { type: UPDATE_USER, payload: user };
}

function userRegistered(user) {
  return { type: REGISTER_USER, payload: user };
}

function logout() {
  return { type: LOGOUT_USER};
}

function loadUser(token, username, email) {
  return { type: LOGIN_USER, payload: {token, username, email} };
}


export { login, register, logout, loadUser, updateUserApi, deleteUserApi };