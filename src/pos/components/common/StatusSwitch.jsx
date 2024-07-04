import React from "react";

const StatusSwitch = ({ id, status, loading, handleChange }) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={`flexSwitchCheckChecked${id}`}
        disabled={loading ? true : false}
        checked={status === 1 ? true : false}
        onChange={() => handleChange(id, status)}
      />
    </div>
  );
};

export default StatusSwitch;
