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

// Display a stock

function StockDetails() {
  const { ticker } = useParams();
  const [range, setRange] = useState('today');
  const [formVisible, setFormVisible] = useState(false);
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
    if (missing) {
      dispatch(getStockFromAPI(ticker));
    }
  }, [missing, ticker, dispatch]);

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
  if(!missingQuote && quote[range]) {
    console.log(quote[range].labels);
    console.log(quote[range].data);
    chartData = {
      labels: quote[range].labels,
      datasets: [
        {
          label: "USD",
          data: quote[range].data,
          backgroundColor: ['rgb(0 200 5 / 10%)'],
          borderColor: ['rgb(0 200 5)'],
          borderWidth: 2,
          spanGaps: true,
          lineTension: 0,
          pointRadius: 4,
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(0, 0, 0, 0)',
          pointHoverRadius: 6,
          pointHoverBorderColor: 'rgb(0 200 5)',
          pointHoverBackgroundColor: 'rgb(0 200 5)'
        }
      ]
    }
  }

  const chartOptions = {
    legend: {
      display: false,
      labels: {
        boxWidth: 0
      }
    },
    tooltips: { 
      intersect: false,
      position: 'nearest',
      mode: 'index',
      backgroundColor: 'white',
      borderColor: 'rgb(0 200 5)',
      bodyFontColor: 'black',
      titleFontColor: 'black',
      cornerRadius: 4,
      titleFontStyle: 'normal',
      bodyFontStyle: 'bold',
      callbacks: {
        // Include a dollar sign in the tooltip label
        label: function(tooltipItem, data) {
            let label = "$" + tooltipItem.yLabel;
            return label;
        }
      }
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '$' + value;
            }
          },
          gridLines: {
            display: true,
            drawOnChartArea: false
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 4,
            maxRotation: 0
          },
          gridLines: {
            display: true,
            drawOnChartArea: false
          }
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
      <h1 className="mt-3 mb-3">
        {stock.name} <span>({ticker})</span>
      </h1>
      {token &&
        <div className="add-stock-form mb-3 mr-5">
          <button className="float-right btn btn-primary" onClick={() => setFormVisible(true)}>+ Add to List</button>
        </div>
      }
      {!missingQuote &&
        <div className="graph">
          <div className="graph-nav">
            <button className={range === "today" ? "active" : ""} onClick={() => setRange("today")}>1D</button>
            <button className={range === "1w" ? "active" : ""} onClick={() => setRange("1w")}>1W</button>
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
