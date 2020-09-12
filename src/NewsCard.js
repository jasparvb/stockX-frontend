import React from "react";
import './NewsCard.css';

function NewsCard({headline, image, url, source}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="news text-dark">
      <div className="NewsCard col-md-10">
        <div className="box">
          <div className="headline-box">
            <p className="mb-0">{source}</p>
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