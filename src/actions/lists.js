import { ADD_LIST, LOAD_LISTS, REMOVE_LIST } from "./types";
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

function getListsAPI() {
  return async function (dispatch) {
    const lists = await StockXApi.getLists();
    dispatch(gotLists(lists));
  };
}

function gotLists(lists) {
  return { type: LOAD_LISTS, payload: lists };
}

function removeListAPI(id) {
  return async function (dispatch) {
    await StockXApi.removeList(id);
    dispatch(removedList(id));
  };
}

function removedList(id) {
  return { type: REMOVE_LIST, payload: id };
}

export { addNewListAPI, getListsAPI, removeListAPI };