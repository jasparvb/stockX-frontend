import React from "react";

function StockDetails({title, price, handleAddToList}) {
    return (
        <div className="Card card">
            <div className="card-body">
                <h6 className="card-title d-flex justify-content-between">
                    <span className="text-capitalize">{title}</span>
                </h6>
                <div>Price: {price}</div>
                <button className="btn btn-danger font-weight-bold text-uppercase float-right" 
                    onClick={handleAddToList}
                    >
                    +
                </button>
            </div>
        </div>
    );
}

export default StockDetails;