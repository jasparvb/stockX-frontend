import React from "react";
import { Link } from "react-router-dom";

function AutoCompleteItem({ticker, name, assetType, countryCode, clearForm}) {
    return (
      <Link to={`/detail/${ticker}`} onClick={clearForm}>
        <div className="AutoCompleteItem">
          <h3>{ticker} &ndash; {name}</h3>
          <p>{countryCode} | {assetType}</p>
        </div>
      </Link>
    );
}

export default AutoCompleteItem;