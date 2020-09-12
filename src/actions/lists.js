import { ADD_LIST, LOAD_LISTS, REMOVE_LIST, ADD_STOCK, REMOVE_STOCK } from "./types";
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
    const message = await StockXApi.removeList(id);
    dispatch(removedList(id));
    dispatch(addAlert(message, "success"));
  };
}

function removedList(id) {
  return { type: REMOVE_LIST, payload: id };
}

//Actions to add or delete stocks from lists

function addNewStockAPI(ticker, name, listId) {
  return async function (dispatch) {
    const stock = await StockXApi.addStock({ticker, name, listId});
    //dispatch(addedStock(stock));
    getListsAPI();
    dispatch(addAlert("Added stock to list", "success"));
  };
}

function addedStock(stock) {
  return { type: ADD_STOCK, payload: stock };
}


function removeStockAPI(id, listId) {
  return async function (dispatch) {
    const message = await StockXApi.removeStock(id);
    //dispatch(removedStock(id, listId));
    dispatch(addAlert(message, "success"));
    getListsAPI();
  };
}

function removedStock(id, listId) {
  return { type: REMOVE_STOCK, payload: {id, listId} };
}


export { addNewListAPI, getListsAPI, removeListAPI, removeStockAPI, addNewStockAPI };