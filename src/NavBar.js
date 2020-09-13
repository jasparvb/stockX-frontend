import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import stockXLogo from "./images/stockX-logo.png";
import Search from './Search';
import './NavBar.css';

//Top navigation

function Navbar() {

  const user = useSelector(st => st.users);

  return (
    <nav className="navbar navbar-light">
    <Link to="/" className="navbar-brand text-dark">
      <img src={stockXLogo} alt="stockX logo"/>
    </Link>
    <Search />
    {user.token ?
      <ul className="navbar-nav flex-row">
        <li className="nav-item px-3">
          <Link to="/lists" className="nav-link">Watchlists</Link>
        </li>
        <li className="nav-item px-3">
          <Link to="/account" className="nav-link">Account</Link>
        </li>
      </ul>
      :
      <ul className="navbar-nav flex-row">
        <li className="nav-item px-3">
          <Link to="/login" className="nav-link">Log In</Link>
        </li>
        <li className="nav-item px-3">
          <Link to="/login" className="btn btn-primary btn-md mr-4 mt-0">Sign Up</Link>
        </li>
      </ul>
    }
    </nav>
  );
}

export default Navbar;
