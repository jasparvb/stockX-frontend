import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addNewStockAPI } from './actions/lists';
import './AddStockForm.css';
import { useClickOutside } from 'react-click-outside-hook';
import AddListForm from './AddListForm';

function AddStockForm({ticker, name, setFormVisible, lists}) {
  const dispatch = useDispatch();

  const [ref, hasClickedOutside] = useClickOutside();

  useEffect(() => {
    if(hasClickedOutside) {
      setFormVisible(false);
    }
  },[hasClickedOutside]);

  function addStock(listId) {
    dispatch(addNewStockAPI(ticker, name, listId));
    setFormVisible(false);
  }

  return (
    <div className="AddStockForm container-fluid text-left">
      <div className="overlay"></div>
      <div className="form-container">
        <div ref={ref} className="form-column">
          <h3 className="mb-3">Create a new list</h3>
          <AddListForm />
          {lists.length ?
            <>
            <p className="mt-4">Add stock to a list below</p>
            {lists.map(l => (
              <button 
              key={l.id} 
              className="btn btn-outline-primary" 
              onClick={() => addStock(l.id)}>Add to "{l.name}"
              </button>
            ))}
            </>
            : ''
          }
        </div>
      </div>
    </div>
  );
}

export default AddStockForm;