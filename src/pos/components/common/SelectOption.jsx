import React from "react";

const SelectOption = ({
  name,
  value,
  handleOnChange,
  title,
  items,
  isLoading,
  isError,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={handleOnChange}
      className="form-control m-0"
      required
    >
      <option className="d-none text-gray-sm">{title}</option>
      {items?.length === 0 || items === undefined || isLoading || isError ? (
        <option>No data found!</option>
      ) : (
        items?.map((item) => (
          <option key={item?.id} value={item?.id}>
            {item?.name}
          </option>
        ))
      )}
    </select>
  );
};

export default SelectOption;
