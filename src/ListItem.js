import React from "react";
import './ListItem.css';
import { Link } from "react-router-dom";

//Ticker details in a list

function ListItem({id, ticker, name, quote, listId, removeStock}) {
  return (
    <div className="ListItem px-5">
      <Link to={`/${ticker}`} className="text-left col-md-5">
      <h4 className="mb-0">{ticker}</h4>
      <p>{name}</p>
      </Link>
      <div className="text-right col-md-5">
        {quote.close && quote.change && quote.changePercent ?
        <>
          <h4 className="mb-0">${quote.close.toFixed(2)}</h4>
          <p className={`percent-change ${quote.change < 0 && "down"}`}>{quote.change >= 0 && "+"}{(quote.changePercent * 100).toFixed(2)}%</p>
        </>
        : <h4>Price currently unavailable</h4>
        }
      </div>
      <button className="btn remove" onClick={() => removeStock(id, listId)}>
        <i className="fas fa-times" />
      </button>
    </div>
  );
}

export default ListItem;