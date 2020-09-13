import React, { useState, useEffect } from "react";
import './Account.css';
import { Link } from "react-router-dom";
import { logout } from './actions/users';
import { addAlert } from './actions/alerts';
import { updateUserApi } from './actions/users';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Account() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(st => st.users);
  const [emailData, setEmailData] = useState({email: user.email});
  const [editVisible, setEditVisible] = useState(false);

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

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      //update user email
      await dispatch(updateUserApi(user.username, emailData));
      setEditVisible(false);
    } catch (errors) {
      return setEmailData(data => ({ ...data, errors }));
    }
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { value } = evt.target;
    setEmailData({email: value});
  };

  return (
    <div className="Account container-fluid">
      <div className="row p-3">
      <div className="text-left col-md-6 offset-md-3 col-lg-4 offset-lg-4 my-3">
        <h3>Username: {user.username}</h3>
        {!editVisible && <><p>Email: {user.email}</p>
        <button className="btn btn-primary btn-sm" onClick={() => setEditVisible(true)}>Edit</button></>}
        {editVisible && <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  value={emailData.email} 
                  onChange={handleChange}
                />
              </div>          
            <button type="submit" className="btn btn-primary btn-sm mr-3">Save</button>
            <button className="btn btn-primary btn-sm" onClick={() => setEditVisible(false)}>Cancel</button>
          </form>
        }

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