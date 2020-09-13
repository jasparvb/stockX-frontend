import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from './actions/users';

function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const INITIAL_STATE = { 
    username: "",
    password: "",
    email: "",
    errors: [] 
  };

  const [loginData, setLoginData] = useState(INITIAL_STATE);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(st => st.users);
  
  function setLogin() {
    setActiveTab('login');
  }
  function setSignup() {
    setActiveTab('signup');
  }
  //bounces logged in users to home page if already logged in
  useEffect(() => {
    async function checkLogin() {
      if (user.token) {
        history.push('/');
      }
    }
    checkLogin();
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    let endpoint;
    let data;

    if(activeTab === 'signup') {
      data = {
        username: loginData.username,
        password: loginData.password,
        email: loginData.email || undefined
      };
      endpoint = "register";
    } else {
      data = {
        username: loginData.username,
        password: loginData.password
      };
      endpoint = "login";
    }

    try {
      //login or register user
      if(endpoint === "login") {
        await dispatch(login(data))
      } else {
        await dispatch(register(data));
      }
      setLoginData(INITIAL_STATE);
      history.push('/');
    } catch (errors) {
      return setLoginData(data => ({ ...data, errors }));
    }
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { name, value } = evt.target;
    setLoginData(fData => ({
      ...fData,
      [name]: value
    }));
  };


  return (
    <div className="Login container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5 text-left">
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <button className={`btn login ${activeTab === 'login' ? "active" : ""}`} onClick={setLogin}>Login</button>
          <button className={`btn signup ${activeTab === 'signup' ? "active" : ""}`} onClick={setSignup}>Sign up</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                name="username" 
                className="form-control" 
                value={loginData.username} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                value={loginData.password} 
                onChange={handleChange}
              />
            </div>
            {activeTab === 'signup' && 
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  value={loginData.email} 
                  onChange={handleChange}
                />
              </div>          
            }
            <button type="submit" className="btn btn-primary float-right">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;