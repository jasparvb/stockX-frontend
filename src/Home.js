import React from "react";
import { Link } from "react-router-dom";
import BannerBg from './images/stockX-bg.jpg';
import './Home.css';

//Home page banner

function Home() {
  return (
    <section className="Home col-md-12 p-0">
      <div className="banner container-fluid text-center text-light m-0 p-5" style={{ backgroundImage: `url(${BannerBg})`}} >
        <div className="content-wrapper mb-5">
          <h1 className="mb-3 font-weight-bold">stockX</h1>
          <p className="lead">Start tracking your financial data today</p>
          <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 my-5">Log In or Register</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
