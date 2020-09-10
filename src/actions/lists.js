import { ADD_LIST } from "./types";
import StockXApi from "../StockXApi";

/* Actions to create, edit, delete lists */

function addNewListAPI(name) {
  return async function (dispatch) {
    const list = await StockXApi.addList(name);
    dispatch(addedList(list));
  };
}

function addedList(list) {
  return { type: ADD_LIST, payload: list };
}

export { addNewListAPI };