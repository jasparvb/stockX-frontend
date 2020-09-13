import React from "react";
import ListItem from './ListItem';
import './List.css';

function List({id, name, stocks, removeList, removeStock}) {

  return (
    <div className="List col-md-4 col-lg-4 mb-4">
      <div className="list-box">
        <h3 className="mb-4">{name}</h3>
        {stocks.length ? 
          stocks.map(s => (
            <ListItem 
              key={s.id} 
              id={s.id} 
              ticker={s.ticker} 
              name={s.name} 
              quote={s.quote}
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