import React from "react";

const TableTopSearch = ({ searchText, setSearchText }) => {
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
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TableTopSearch;
