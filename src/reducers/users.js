import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, UPDATE_USER } from "../actions/types";

/* Reducer for users */

const INITIAL_STATE = {};

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;

    case REGISTER_USER:
      return action.payload;

    case UPDATE_USER:
      return {...state, email: action.payload.email};

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default users;