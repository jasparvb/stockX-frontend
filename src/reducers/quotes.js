import { LOAD_QUOTE } from "../actions/types";

/* Reducer for quotes */

const INITIAL_STATE = {};

function quotes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_QUOTE:
      let labels = [];
      let data = [];
      for(let q of action.payload.chart) {
        labels.push(q.label);
        data.push(q.open);
      } 
      return {
        ...state,
        [action.payload.ticker]: {...state[action.payload.ticker], [action.payload.range]: { data, labels }}
      };

    default:
      return state;
  }
}

export default quotes;