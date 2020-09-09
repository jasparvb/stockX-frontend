import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStockFromAPI } from "./actions/stocks";
import { getStockQuoteFromAPI } from "./actions/quotes";
import NewsCard from './NewsCard';
import { Line } from 'react-chartjs-2';
import './StockDetails.css';

// Display a stock

function StockDetails() {
  const { ticker } = useParams();
  const stock = useSelector(st => st.stocks[ticker]);
  const quote = useSelector(st => st.quotes[ticker]);
  const dispatch = useDispatch();
  const missing = !stock;
  const missingQuote = !quote;

  //load stock details from api if not in state
  useEffect(function() {
    if (missing) {
      dispatch(getStockFromAPI(ticker));
    }
  }, [missing, ticker, dispatch]);

  //load stock quote from api if not in state
  useEffect(function() {
    if (missingQuote) {
      dispatch(getStockQuoteFromAPI(ticker, "today"));
    }
  }, [missingQuote, ticker, dispatch]);

  if (missing) return "Loading...";

  return (
    <div className="StockDetails">
      <h1 className="mt-3 mb-3">
        {stock.name} <span>({ticker})</span>
      </h1>
      <h3>About</h3>
      <hr/>
      <p className="mb-5">{stock.description}</p>
      {stock.articles[0] &&
        <div className="articles">
          <h3>Related News</h3>
          <hr/>
          {stock.articles.map((s, i) => (
            <NewsCard
              key={i}
              headline={s.headline}
              image={s.image}
              url={s.url}
              source={s.source}
            />
          ))}
        </div>
      }
    </div>
  );
}

export default StockDetails;
