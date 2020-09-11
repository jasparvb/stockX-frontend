import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addAlert } from './actions/alerts';
import { removeStockAPI } from './actions/lists';

function ListItem({id, ticker, name, listId}) {
  const dispatch = useDispatch();

  async function removeStock() {
    await dispatch(removeStockAPI(id, listId));
    await dispatch(addAlert("Stock removed", "success"));
  }

  return (
    <div className="List">
      <h4>{ticker}</h4>
      <p>{name}</p>
      <button onClick={removeStock}>X</button>
    </div>
  );
}

export default ListItem;