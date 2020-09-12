import React from "react";

function ListItem({id, ticker, name, listId, removeStock}) {

  return (
    <div className="List">
      <h4>{ticker}</h4>
      <p>{name}</p>
      <button onClick={() => removeStock(id, listId)}>X</button>
    </div>
  );
}

export default ListItem;