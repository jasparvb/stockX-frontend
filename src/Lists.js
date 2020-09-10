import React, { useState } from "react";
import './Lists.css';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from './actions/alerts';
import AddListForm from './AddListForm';

function Lists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(st => st.users);

  //bounces user to home page if not logged in
  if (!token) {
    dispatch(addAlert(`You must be logged in to view that page!`, "danger"));
    history.push('/');
  }
  return (
    <div className="Lists">
      <AddListForm />
    </div>
  );
}

export default Lists;