import React from "react";
import blankImage from "../../../../assets/images/icons/blank-grey.svg";

const CheckboxItems = ({ checkBoxItems, handleOnChange, title }) => {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 pt-3 pb-4">
        <h6 className="fw-semibold">{title}</h6>
        <img src={blankImage} alt="icon" />
      </div>
      {checkBoxItems?.map((data, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <input
            type="checkbox"
            className="custom-checkbox-bg"
            id={title?.replace(/\s/g, "") + index}
            name={data?.fieldName}
            checked={data?.fieldValue || false}
            onChange={handleOnChange}
          />
          <label
            className="settings-label"
            htmlFor={title?.replace(/\s/g, "") + index}
          >
            {data?.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxItems;
