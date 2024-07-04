import React from "react";

const SerialNumberWithoutCheckbox = ({ dataFrom, index }) => {
  return (
    <span className="ms-0">
      {dataFrom < 9 && index < 9 ? `0${dataFrom + index}` : dataFrom + index}
    </span>
  );
};

export default SerialNumberWithoutCheckbox;
