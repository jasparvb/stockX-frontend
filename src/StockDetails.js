import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getStockFromAPI } from "./actions/stocks";

// Display a stock

function StockDetails() {
  const { ticker } = useParams();
  const stock = useSelector(st => st.stocks[ticker]);
  const dispatch = useDispatch();
  const missing = !stock;

  //load planet from api if not in state
  useEffect(function() {
    if (missing) {
      dispatch(getStockFromAPI(ticker));
    }
  }, [missing, ticker, dispatch]);

  if (missing) return "Loading...";

  return (
    <div>
      <h1 className="mt-3 mb-3">
        {stock.name}
        <small className="text-muted float-right">{ticker}</small>
      </h1>
      <p>{stock.description}</p>
    </div>
  );
}

export default StockDetails;
