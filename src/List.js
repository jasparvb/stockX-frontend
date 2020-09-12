import React from "react";
import ListItem from './ListItem';
import './List.css';

function List({id, name, stocks, removeList, removeStock}) {

  return (
    <div className="List col-md-4 mb-4">
      <div className="list-box">
        <h3>{name}</h3>
        {stocks.length ? 
          stocks.map(s => (
            <ListItem 
              key={s.ticker} 
              id={s.id} 
              ticker={s.ticker} 
              name={s.name} 
              listId={id} 
              removeStock={removeStock} 
            />
          ))
        : <p>No stocks added yet</p>
        }
        <button className="btn btn-primary btn-sm mt-3" onClick={() => removeList(id)}>Delete List</button>
      </div>
    </div>
  );
}

export default List;