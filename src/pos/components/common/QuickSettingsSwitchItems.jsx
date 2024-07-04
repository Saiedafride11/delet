import React from "react";

const QuickSettingsSwitchItems = ({ switchItems, handleOnChange, title }) => {
  return (
    <div className="mb-3">
      <label className="col-form-label setting-title rounded px-2">
        {title}
      </label>
      {switchItems?.map((data, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between border-bottom"
        >
          <label
            className="col-form-label"
            htmlFor={title?.replace(/\s/g, "") + index}
          >
            {data?.title}
          </label>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              role="switch"
              className="form-check-input"
              disabled={data?.fieldName === "isChecked"}
              id={title?.replace(/\s/g, "") + index}
              name={data?.fieldName}
              checked={data?.fieldValue || false}
              onChange={handleOnChange}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickSettingsSwitchItems;
