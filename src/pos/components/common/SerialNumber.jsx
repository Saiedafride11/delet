import React from "react";

const SerialNumber = ({
  id,
  index,
  selectItems,
  handleItemsSelect,
  dataFrom,
}) => {
  return (
    <div className="d-flex align-items-center">
      <input
        type="checkbox"
        className="print-d-none"
        checked={selectItems?.includes(id)}
        onChange={() => handleItemsSelect(id)}
        name="index"
      />
      <span>
        {/* {index < 9 ? `0${index + 1}` : index + 1} */}
        {dataFrom < 9 && index < 9 ? `0${dataFrom + index}` : dataFrom + index}
      </span>
    </div>
  );
};

export default SerialNumber;
