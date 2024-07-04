import React from "react";

const MultipleSelectCheckBox = ({ checkedItems, handleMultipleSelect }) => {
  return (
    <div className="d-flex align-items-center">
      <input
        type="checkbox"
        checked={checkedItems}
        onChange={handleMultipleSelect}
        className="print-d-none"
        name="multiple-select-item"
      />
      <span>SL.</span>
    </div>
  );
};

export default MultipleSelectCheckBox;
