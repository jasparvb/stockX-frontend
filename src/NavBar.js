import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import stockXLogo from "./stockX-logo.png";
import './NavBar.css';

function Navbar() {
    return (
        <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand text-light">
            <img src={stockXLogo} />
        </Link>
        <ul className="navbar-nav flex-row">
            <li className="nav-item">
            <Link to="/login" className="nav-link text-light">
                Log In/Register
            </Link>
            </li>
        </ul>
        </nav>
    );
}

export default Navbar;
