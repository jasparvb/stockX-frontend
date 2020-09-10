import lists from './lists';
import stocks from './stocks';
import quotes from './quotes';
import users from './users';
import { combineReducers } from "redux";

export default combineReducers({
  lists,
  stocks,
  quotes,
  users
});