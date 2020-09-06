import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import { decode } from "jsonwebtoken";
import StockXApi from "./StockXApi";

function App() {
  const [user, setUser] = useState(null);
  const initialValue = localStorage.getItem('stockx-token') || null;
  const [token, setToken] = useState(initialValue);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        let { username } = decode(token);
        let currentUser = await StockXApi.getUser(username);
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      }
      setInfoLoaded(true);
    }

    if (!token) {
      localStorage.removeItem('stockx-token');
    } else {
      localStorage.setItem('stockx-token', token);
    }
    setInfoLoaded(false);
    getUser();
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="App">
      <NavBar logout={logout} />
      <Routes setToken={setToken} />
    </div>
  );
}

export default App;
