import React, { useState, useEffect } from "react";
import './Lists.css';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from './actions/alerts';
import { getListsAPI } from './actions/lists';
import { removeListAPI } from './actions/lists';
import AddListForm from './AddListForm';
import List from './List';

function Lists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(st => st.users);
  const lists = useSelector(st => st.lists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getLists() {
      await dispatch(getListsAPI());
      setIsLoading(false);
    }

    if (isLoading) {
      getLists();
    }
    
  }, [dispatch, isLoading, lists]);

  async function removeList(id) {
    await dispatch(removeListAPI(id));
  }

  if (isLoading) return <h3><b>Loading...</b></h3>;
  
  if (!isLoading && !lists) return <h1>You don't have any posts yet</h1>;


  //bounces user to home page if not logged in
  if (!token) {
    dispatch(addAlert(`You must be logged in to view that page!`, "danger"));
    history.push('/login');
  }
  return (
    <div className="Lists container-fluid">
      <AddListForm />
      {lists ? 
      <div className="list-container">
        {lists.map(l => (
          <List key={l.id} id={l.id} name={l.name} stocks={l.stocks} removeList={removeList} />
        ))}
      </div>
      : <div className="text-center my-5">
        <h4>(You haven't created any lists yet)</h4>
      </div>}
    </div>
  );
}

export default Lists;