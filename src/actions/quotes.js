import { LOAD_QUOTE } from "./types";
import StockXApi from "../StockXApi";

/* Action to load a stock quote given ticker and range */

function getStockQuoteFromAPI(ticker, range) {
  return async function (dispatch) {
    const quote = await StockXApi.getStockQuote(ticker, range);
    dispatch(gotStockQuote(quote));
  };
}

function gotStockQuote(quote) {
  return { type: LOAD_QUOTE, payload: quote };
}

export { getStockQuoteFromAPI };