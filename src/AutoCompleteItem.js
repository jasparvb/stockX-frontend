import React from "react";
import { Link } from "react-router-dom";
import './AutoCompleteItem.css';

function AutoCompleteItem({id, ticker, name, assetType, countryCode, clearForm, selected, setSelected}) {
    return (
      <Link to={`/detail/${ticker}`} onClick={clearForm} onMouseEnter={() => setSelected(id)}>
        <div className={`AutoCompleteItem ${selected === id ? "active" : ""}`}>
          <h3>{ticker} &ndash; {name}</h3>
          <p>{countryCode} | {assetType}</p>
        </div>
      </Link>
    );
}

export default AutoCompleteItem;