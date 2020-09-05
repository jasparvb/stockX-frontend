import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-info">
        <Link to="/" className="navbar-brand text-light">
            <img src="%PUBLIC_URL%/stockX-logo.png"/>
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
