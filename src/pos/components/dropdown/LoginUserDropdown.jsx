import React from "react";
import { useSelector } from "react-redux";

const LoginUserDropdown = ({ value, handleOnChange }) => {
  const initialData = useSelector((state) => state?.admin?.adminProfile);
  return (
    <div className="input-wrapper pos-up-down-arrow">
      <select
        name="user_id"
        value={value}
        onChange={handleOnChange}
        className="form-control m-0"
        required=""
      >
        <option className="d-none">Choose One</option>
        {initialData?.id === "" ? (
          <option>No data found!</option>
        ) : (
          <option value={initialData?.id}>
            {initialData?.name === null ? "User" : initialData?.name}
          </option>
        )}
      </select>
      <span></span>
    </div>
  );
};

export default LoginUserDropdown;
