import { ADD_LIST, LOAD_LISTS, REMOVE_LIST } from "./types";
import StockXApi from "../StockXApi";
import { addAlert } from './alerts';

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
    dispatch(addAlert("List removed", "success"));
  };
}

function removedList(id) {
  return { type: REMOVE_LIST, payload: id };
}

function removeStockAPI(id, listId) {
  return async function (dispatch) {
    await StockXApi.removeStock(id);
    dispatch(removedStock(id, listId));
  };
}

function removedStock(id, listId) {
  return { type: REMOVE_LIST, payload: {id, listId} };
}

export { addNewListAPI, getListsAPI, removeListAPI, removeStockAPI };