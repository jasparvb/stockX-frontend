import React from "react";
import './AutoCompleteItem.css';

//Element displayed in search auto-suggest dropdown

function AutoCompleteItem({id, ticker, name, assetType, countryCode, selected, setSelected}) {
    return (
      <div 
        className={`AutoCompleteItem ${selected - 1 === id ? "active" : ""}`}
        onMouseEnter={() => setSelected(id + 1)}
      >
        <h3>{ticker} &ndash; {name}</h3>
        <p>{countryCode} | {assetType}</p>
      </div>
    );
}

export default AutoCompleteItem;