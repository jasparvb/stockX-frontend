import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import NavBar from './NavBar';
import Alerts from './Alerts';
import Routes from './Routes';
import { loadUser } from './actions/users';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const user = useSelector(st => st.users);
  const dispatch = useDispatch();
  
  /*Check if user is logged in, load token from localstorage 
    and save in state if available */
  useEffect(() => {
    async function checkUser() {
      const initialValue = localStorage.getItem('stockx-token') || null;
      
      if(user.token) {
        localStorage.setItem('stockx-token', user.token);
        localStorage.setItem('stockx-username', user.username);
        localStorage.setItem('stockx-email', user.email);
      } else if(initialValue) {
        const username = localStorage.getItem('stockx-username');
        const email = localStorage.getItem('stockx-email');
        await dispatch(loadUser(initialValue, username, email));
      }
      setInfoLoaded(true);
    }
    checkUser();
  }, [user, dispatch]);

  if (!infoLoaded) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="App">
      <NavBar />
      <Alerts />
      <Routes />
    </div>
  );
}

export default App;
