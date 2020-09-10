import { ADD_ALERT, REMOVE_ALERTS } from "../actions/types";

const INITIAL_STATE = [];

function alerts(state = INITIAL_STATE, action) {
  
  switch (action.type) {

    case ADD_ALERT:
      return [...state, action.payload];

    case REMOVE_ALERTS:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default alerts;