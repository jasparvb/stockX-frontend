import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from './actions/alerts';
import { addNewListAPI } from './actions/lists';

function AddListForm() {
  const dispatch = useDispatch();

  const INITIAL_STATE = { 
    title: ""
  };

  const [text, setText] = useState(INITIAL_STATE);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(addNewListAPI(text.title));
    setText(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { value } = evt.target;
    setText({title: value});
  };

  return (
    <div className="AddListForm container text-left mt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            name="title" 
            type="text"
            className="form-control" 
            placeholder="New Comment"
            value={text.title} 
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary float-left mt-1">Add</button>
      </form>
    </div>
  );
}

export default AddListForm;