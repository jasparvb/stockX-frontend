import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addAlert } from './actions/alerts';
import { removeListAPI } from './actions/lists';

function List({id, title, stocks}) {
  const dispatch = useDispatch();

  async function removeList() {
    await dispatch(removeListAPI(id));
    await dispatch(addAlert("List removed", "success"));
  }

  return (
    <div className="List">
      <h3>{title}</h3>
      {stocks && stocks.map(s => (
        <ListItem key={s.ticker} ticker={s.ticker} name={s.name} />
      ))}
      <button onClick={removeList}>Delete List</button>
    </div>
  );
}

export default List;