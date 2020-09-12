import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from './actions/alerts';
import { addNewStockAPI } from './actions/lists';
import './AddStockForm.css';
import { useClickOutside } from 'react-click-outside-hook';
import AddListForm from './AddListForm';

function AddStockForm({ticker, name, setFormVisible}) {
  const dispatch = useDispatch();

  const INITIAL_STATE = { 
    title: ""
  };

  const [text, setText] = useState(INITIAL_STATE);
  const [ref, hasClickedOutside] = useClickOutside();

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(addNewStockAPI(text));
    setText(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { value } = evt.target;
    setText({title: value});
  };

  useEffect(() => {
    if(hasClickedOutside) {
      setFormVisible(false);
    }
  },[hasClickedOutside]);

  return (
    <div className="AddStockForm container-fluid text-left" onClick={hideForm} >
      <div className="overlay"></div>
      <div className="form-container">
        <div ref={ref} className="form-column">
          <h3>Create a new list</h3>
          <AddListForm />
          <p>Add stocks to your lists below</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                name="title" 
                type="text"
                className="form-control" 
                placeholder="New list title"
                value={text.title} 
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-1">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStockForm;