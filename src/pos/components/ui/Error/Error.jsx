import React from "react";

const Error = ({ message }) => {
  return (
    <div
      className="alert alert-danger py-2 my-2 text-break text-start mx-20"
      role="alert"
    >
      {message}
    </div>
  );
};

export default Error;
