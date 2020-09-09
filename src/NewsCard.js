import React from "react";
import './NewsCard.css';

function NewsCard({headline, image, url, source}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="NewsCard">
        <div className="box">
          <div className="headline-box">
            <p>{source}</p>
            <h4>{headline}</h4>
          </div>
          <div className="image-box">
            <img src={image} alt={headline} />
          </div>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;