import lists from './lists';
import stocks from './stocks';
import quotes from './quotes';
import { combineReducers } from "redux";

export default combineReducers({
  lists,
  stocks,
  quotes
});