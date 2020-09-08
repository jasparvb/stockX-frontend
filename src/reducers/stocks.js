import { LOAD_STOCK } from "../actions/types";

/* Reducer for planets */

const INITIAL_STATE = {};

function stocks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_ALL:
      return { ...INITIAL_STATE };

    case LOAD_STOCK:
      return {
        ...state,
        [action.payload.ticker]: { ...action.payload }
      };

    default:
      return state;
  }
}

export default stocks;