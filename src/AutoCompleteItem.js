import React from "react";
import './AutoCompleteItem.css';

function AutoCompleteItem({id, ticker, name, assetType, countryCode, handleSubmit, selected, setSelected}) {
    return (
      <div 
        className={`AutoCompleteItem ${selected - 1 === id ? "active" : ""}`}
        onClick={handleSubmit} 
        onMouseEnter={() => setSelected(id + 1)}
      >
        <h3>{ticker} &ndash; {name}</h3>
        <p>{countryCode} | {assetType}</p>
      </div>
    );
}

export default AutoCompleteItem;