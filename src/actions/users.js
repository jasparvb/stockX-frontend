import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "./types";
import StockXApi from "../StockXApi";
import { addAlert } from './alerts';

/* Actions to handle user registration, login and logout */

function login(data) {
  return async function (dispatch) {
    try {
      const user = await StockXApi.login(data);
      dispatch(userLoggedIn(user));
      dispatch(addAlert(`Welcome ${data.username}!`, "success"));
    } catch(err) {
      err.forEach(e => {
        dispatch(addAlert(e, "danger"));
      });
    }
  };
}

function userLoggedIn(user) {
  return { type: LOGIN_USER, payload: user };
}

function register(data) {
  return async function (dispatch) {
    try {
      const user = await StockXApi.register(data);
      dispatch(userRegistered(user));
      dispatch(addAlert(`Welcome ${data.username}!`, "success"));
    } catch(err) {
      err.forEach(e => {
        dispatch(addAlert(e, "danger"));
      });
    }
  };
}

function userRegistered(user) {
  return { type: REGISTER_USER, payload: user };
}

function logout() {
  return { type: LOGOUT_USER};
}

function loadUser(user) {
  return { type: LOGIN_USER, payload: user };
}


export { login, register, logout, loadUser };