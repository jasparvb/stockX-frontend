import { LOAD_STOCK } from "./types";
import StockXApi from "../StockXApi";

/* Action to load a stock given a ticker */

function getStockFromAPI(ticker) {
  return async function (dispatch) {
    const stock = await StockXApi.getStockDetails(ticker);
    dispatch(gotStock(stock));
  };
}

function gotStock(stock) {
  return { type: LOAD_STOCK, payload: stock };
}

export { getStockFromAPI };