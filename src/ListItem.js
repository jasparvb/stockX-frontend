import React from "react";
import './ListItem.css';

function ListItem({id, ticker, name, listId, removeStock}) {

  return (
    <div className="ListItem">
      <h4>{ticker}</h4>
      <p>{name}</p>
      <button className="btn" onClick={() => removeStock(id, listId)}>
        <i class="fas fa-times" />
      </button>
    </div>
  );
}

export default ListItem;