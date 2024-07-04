import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  document.title = "404 Error";
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
          <h1 className="mx-4">404</h1>
        </div>
        <div>
          <h5>Oops! You're lost.</h5>
          <p>The page you are looking for was not found.</p>
          <Link to="/">
            <button className="bg-sky text-white border-0 py-2 px-5 rounded my-3">
              Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
