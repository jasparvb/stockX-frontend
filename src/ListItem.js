import React from "react";
import './ListItem.css';
import { Link } from "react-router-dom";

function ListItem({id, ticker, name, listId, removeStock}) {

  return (
    <div className="ListItem">
      <Link to={`/${ticker}`}>
      <h4>{ticker}</h4>
      <p>{name}</p>
      </Link>
      <button className="btn" onClick={() => removeStock(id, listId)}>
        <i class="fas fa-times" />
      </button>
    </div>
  );
}

export default ListItem;