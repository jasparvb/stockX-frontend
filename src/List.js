import React from "react";
import ListItem from './ListItem';
import './List.css';

function List({id, name, stocks, removeList, removeStock}) {

  return (
    <div className="List">
      <h3>{name}</h3>
      {stocks && stocks.map(s => (
        <ListItem 
          key={s.ticker} 
          id={s.id} 
          ticker={s.ticker} 
          name={s.name} 
          listId={id} 
          removeStock={removeStock} 
        />
      ))}
      <button className="btn btn-primary btn-sm" onClick={() => removeList(id)}>Delete List</button>
    </div>
  );
}

export default List;