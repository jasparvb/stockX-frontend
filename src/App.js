import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import { loadUser } from './actions/users';

function App() {
  const initialValue = localStorage.getItem('stockx-token') || null;
  const [infoLoaded, setInfoLoaded] = useState(false);
  const token = useSelector(st => st.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(initialValue));
    setInfoLoaded(true);
  }, [token]);

  if (!infoLoaded) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="App">
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
