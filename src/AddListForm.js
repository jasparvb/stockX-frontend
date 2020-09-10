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
    dispatch(addNewListAPI(text));
    setText(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { value } = evt.target;
    setText({title: value});
  };

  return (
    <div className="AddListForm container text-left col-md-6 offset-md-3 col-lg-4 offset-lg-4 my-3">
      <h3>Enter a title to create a new list</h3>
      <p>Once you create a list, you can search for stocks and add them to your list for easy tracking.</p>
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
  );
}

export default AddListForm;