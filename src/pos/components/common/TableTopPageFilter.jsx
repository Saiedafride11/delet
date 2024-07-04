import React from "react";

const TableTopPageFilter = ({ filterPerPage, handlePerPageFilter }) => {
  return (
    <div className="input-wrapper pos-up-down-arrow w-130">
      <select
        name="filter-per-page"
        className="form-control m-0"
        value={filterPerPage}
        onChange={handlePerPageFilter}
      >
        {/* <option value="10">10</option> */}
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
        {/* <option value="all">All</option> */}
      </select>
      <span></span>
    </div>
  );
};

export default TableTopPageFilter;
