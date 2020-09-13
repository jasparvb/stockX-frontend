import React, { useEffect } from "react";
import './Account.css';
import { Link } from "react-router-dom";
import { logout } from './actions/users';
import { addAlert } from './actions/alerts';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Account() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(st => st.users);

  async function logoutUser() {
    await dispatch(logout());
    localStorage.removeItem('stockx-token');
    localStorage.removeItem('stockx-username');
    localStorage.removeItem('stockx-email');
    dispatch(addAlert("You have successfully logged out", "success"));
    history.push('/');
  }

  //bounces user to home page if not logged in
  useEffect(() => {
    if (!user.token) {
      dispatch(addAlert(`You must be logged in to view that page!`, "danger"));
      history.push('/login');
    }
  },[]);

  return (
    <div className="Account container-fluid">
      <div className="row p-3">
      <div className="text-left col-md-6 offset-md-3 col-lg-4 offset-lg-4 my-3">
        <h3>Username: {user.username}</h3>
        <p>Email: {user.email}</p>
        <button className="btn btn-primary btn-sm">Edit</button>
      </div>
      </div>
      <div className="container text-left col-md-6 offset-md-3 col-lg-4 offset-lg-4 py-5">
        <button className="btn btn-primary mr-3" onClick={logoutUser}>Logout</button>
        <button className="btn btn-primary">Delete Account</button>
      </div>
    </div>
  );
}

export default Account;