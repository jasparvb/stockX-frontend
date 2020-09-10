import React from "react";

function Alert({ type, message }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
        <p className="mb-0 small">{message}</p>
    </div>
  );
}

export default Alert;
