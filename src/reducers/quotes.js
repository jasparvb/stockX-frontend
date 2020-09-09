import { LOAD_QUOTE } from "../actions/types";

/* Reducer for quotes */

const INITIAL_STATE = {};

function quotes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_QUOTE:
      return {
        ...state,
        [action.payload.ticker]: { ...action.payload }
      };

    default:
      return state;
  }
}

export default quotes;