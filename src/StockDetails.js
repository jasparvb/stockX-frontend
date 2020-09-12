import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStockFromAPI } from "./actions/stocks";
import { getStockQuoteFromAPI } from "./actions/quotes";
import { getListsAPI } from "./actions/lists";
import NewsCard from './NewsCard';
import AddStockForm from './AddStockForm';
import { Line } from 'react-chartjs-2';
import './StockDetails.css';
import chartOptions from './ChartOptions';

// Display a stock

function StockDetails() {
  const { ticker } = useParams();
  const [range, setRange] = useState('today');
  const [formVisible, setFormVisible] = useState(false);
  const [priceChange, setPriceChange] = useState({price: 0, percent: 0, down: false});
  const token = useSelector(st => st.users);
  const lists = useSelector(st => st.lists);
  const stock = useSelector(st => st.stocks[ticker]);
  const quote = useSelector(st => st.quotes[ticker]);
  const dispatch = useDispatch();
  const missing = !stock;
  const missingQuote = !quote;
  const missingLists = !lists.length;
  let chartData = {};

  //load stock details from api if not in state
  useEffect(function() {
    async function getStock() {
      await dispatch(getStockFromAPI(ticker));
    }
    if (missing) {
      getStock();
    } else {
      let price = (stock.price.close - stock.price.open).toFixed(2);
      let percent = (((stock.price.close - stock.price.open) / stock.price.open) * 100).toFixed(2);
      let down = false;
      if(price < 0){
        price = price * -1;
        down = true;
      }
      setPriceChange({price, percent, down});
    }
    
  }, [missing, ticker, dispatch, stock]);

  //load stock quote from api if not in state
  useEffect(function() {
    if (missingQuote || !quote[range]) {
      dispatch(getStockQuoteFromAPI(ticker, range));
    }
  }, [missingQuote, ticker, dispatch, range]);

  //load user's lists if not in state
  useEffect(() => {
    if(missingLists) {
      dispatch(getListsAPI());
    }
  }, [missingLists, dispatch, lists]);


  if (missing) return "Loading...";

  //Set chart data, labels and color
  if(!missingQuote && quote[range]) {
    let color;
    let colorBg;
    if(priceChange.down) {
      color = 'rgb(255 80 0)'
      colorBg = 'rgb(255 80 0 / 10%)'
    } else {
      color = 'rgb(0 200 5)'
      colorBg = 'rgb(0 200 5 / 10%)'
    }
    chartData = {
      labels: quote[range].labels,
      datasets: [
        {
          label: "USD",
          data: quote[range].data,
          backgroundColor: colorBg,
          borderColor: color,
          borderWidth: 2,
          spanGaps: true,
          lineTension: 0,
          pointRadius: 4,
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(0, 0, 0, 0)',
          pointHoverRadius: 6,
          pointHoverBorderColor: color,
          pointHoverBackgroundColor: color
        }
      ]
    }
  }

  return (
    <div className="StockDetails">
      {formVisible && 
        <AddStockForm 
          ticker={ticker} 
          name={stock.name} 
          setFormVisible={setFormVisible} 
          lists={lists}
        />
      }
      <h1 className="mt-3 mb-0">
        {stock.name} <span>({ticker})</span>
      </h1>
      <p className="price mb-0">${stock.price.close.toFixed(2)}</p>
      <p className={`price-change ${priceChange.down && "down"}`}>{priceChange.down ? "-" : "+"}${priceChange.price} ({!priceChange.down && "+"}{priceChange.percent}%)</p>
      {token &&
        <div className="add-stock-form mb-3 mr-5">
          <button className="float-right btn btn-primary" onClick={() => setFormVisible(true)}>+ Add to List</button>
        </div>
      }
      {!missingQuote &&
        <div className="graph">
          <div className="graph-nav">
            <button className={range === "today" ? "active" : ""} onClick={() => setRange("today")}>1D</button>
            <button className={range === "1m" ? "active" : ""} onClick={() => setRange("1m")}>1M</button>
            <button className={range === "3m" ? "active" : ""} onClick={() => setRange("3m")}>3M</button>
            <button className={range === "1y" ? "active" : ""} onClick={() => setRange("1y")}>1Y</button>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      }
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
