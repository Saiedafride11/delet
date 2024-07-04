import React from "react";

const BaseColorSpinnerGrow = () => {
  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="spinner-grow text-sky" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default BaseColorSpinnerGrow;
