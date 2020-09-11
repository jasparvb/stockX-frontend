import { ADD_LIST, LOAD_LISTS, REMOVE_LIST, LOGOUT_USER, ADD_STOCK, REMOVE_STOCK } from "../actions/types";

/* Reducer for lists */

const INITIAL_STATE = [];

function lists(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LIST:
      return [...state, {...action.payload}];

    case REMOVE_LIST:
      return [...state.filter(l => l.id !== action.payload.id)];

    case LOAD_LISTS:
      return action.payload;

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default lists;