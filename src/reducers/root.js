import lists from './lists';
import stocks from './stocks';
import { combineReducers } from "redux";

export default combineReducers({
  lists,
  stocks,
});