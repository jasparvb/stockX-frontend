import { ADD_LIST, LOAD_LISTS, REMOVE_LIST } from "../actions/types";

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

    default:
      return state;
  }
}

export default lists;