import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import stockXLogo from "./images/stockX-logo.png";
import Search from './Search';
import './NavBar.css';
import { logout } from './actions/users';
import { addAlert } from './actions/alerts';

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem('stockx-token');
    dispatch(addAlert("You have successfully logged out", "success"));
    history.push('/');
  }

  const user = useSelector(st => st.users);

  return (
    <nav className="navbar navbar-light">
    <Link to="/" className="navbar-brand text-dark">
      <img src={stockXLogo} />
    </Link>
    <Search />
    {user ?
      <ul className="navbar-nav flex-row">
        <li className="nav-item px-3">
        <Link to="/lists" className="nav-link">Watchlists</Link>
        </li>
        <li className="nav-item px-3">
        <Link to="#" onClick={logoutUser} className="nav-link">Logout</Link>
        </li>
      </ul>
      :
      <ul className="navbar-nav flex-row">
      </ul>
    }
    </nav>
  );
}

export default Navbar;
