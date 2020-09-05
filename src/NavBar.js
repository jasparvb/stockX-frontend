import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import stockXLogo from "./stockX-logo.png";
import Search from './Search';
import './NavBar.css';

function Navbar() {
    return (
        <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand text-dark">
            <img src={stockXLogo} />
        </Link>
        <Search />
        <ul className="navbar-nav flex-row">
            <li className="nav-item">
            <Link to="/login" className="nav-link text-dark">
                Log In/Register
            </Link>
            </li>
        </ul>
        </nav>
    );
}

export default Navbar;
