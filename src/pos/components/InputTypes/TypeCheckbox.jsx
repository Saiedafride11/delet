import React from "react";

const TypeCheckbox = ({ margin, text, isChecked, handleCheckboxChange }) => {
  return (
    <div className={`d-flex align-items-center ${margin}`}>
      <input
        type="checkbox"
        id={text?.replace(/\s/g, "")}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label className="settings-label" htmlFor={text?.replace(/\s/g, "")}>
        {text}
      </label>
    </div>
  );
};

export default TypeCheckbox;
