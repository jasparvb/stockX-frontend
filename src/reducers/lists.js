import { ADD_LIST, REMOVE_LIST } from "../actions/types";

/* Reducer for lists */

const INITIAL_STATE = {};

function lists(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        [action.payload.id]: { ...action.payload }
      };

    default:
      return state;
  }
}

export default lists;