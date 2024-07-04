import React from "react";

const BaseColorSpinner = () => {
  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-sky" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default BaseColorSpinner;
