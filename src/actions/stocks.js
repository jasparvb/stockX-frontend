import { LOAD_STOCK } from "./types";
import StockXApi from "./StockXApi";

/* Action to load a stock given ticker */

function getStockFromAPI(ticker) {
  return async function (dispatch) {
    const res = await StockXApi.getStockDetails(ticker);
    dispatch(gotStock(res.stock));
  };
}

function gotStock(stock) {
  return { type: LOAD_STOCK, payload: stock };
}

export { getStockFromAPI };