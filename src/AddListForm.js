import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addNewListAPI } from './actions/lists';

//Form to create a new list

function AddListForm() {
  const dispatch = useDispatch();

  const INITIAL_STATE = { 
    title: ""
  };

  const [text, setText] = useState(INITIAL_STATE);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(addNewListAPI(text));
    setText(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { value } = evt.target;
    setText({title: value});
  };

  return (
    <div className="AddListForm">
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
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default AddListForm;