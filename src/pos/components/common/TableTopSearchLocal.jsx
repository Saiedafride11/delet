import React from "react";

const TableTopSearchLocal = ({ searchText, handleSearchChange }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="input-wrapper">
      <input
        type="search"
        name="search"
        className="form-control m-0"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TableTopSearchLocal;
