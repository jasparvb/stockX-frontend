import React from "react";
import { Link } from "react-router-dom";
import BannerBg from './images/stockX-bg.jpg';
import './Home.css';

function Home() {
  return (
    <section className="Home col-md-12 p-0">
      <div className="banner container-fluid text-center text-light m-0 p-5" style={{ backgroundImage: `url(${BannerBg})`}} >
        <h1 className="mt-5 mb-4 font-weight-bold">StockX</h1>
        <p className="lead">Start tracking your financial data today</p>
      </div>
    </section>
  );
}

export default Home;
