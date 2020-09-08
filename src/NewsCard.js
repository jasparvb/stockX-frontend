import React from "react";
import { Link } from "react-router-dom";
import './NewsCard.css';

function NewsCard({headline, image, url}) {
  return (
    <Link to={url}>
      <div className="NewsCard">
        <img src={image} />
        <h4>{headline}</h4>
      </div>
    </Link>
  );
}

export default NewsCard;