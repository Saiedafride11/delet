import React from "react";
import TableTopFromToDate from "../../../components/common/TableTopFromToDate";
import TableTopSearch from "../../../components/common/TableTopSearch";

const ReportsTableTopFilter = ({
  filterPerPage,
  handlePerPageFilter,
  searchText,
  setSearchText,
  dateFilter,
  handleDateFilter,
}) => {
  return (
    <form>
      <div className="d-flex align-items-center gap-2 custom-flex-wrap">
        <div className="d-flex align-items-center gap-2 section-one">
          <div className="input-wrapper pos-up-down-arrow w-130 report-select">
            <select
              name="filter-per-page"
              className="form-control m-0"
              value={filterPerPage}
              onChange={handlePerPageFilter}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
            <span></span>
          </div>
          <TableTopSearch
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
        {/* <div className="input-wrapper pos-up-down-arrow wrapper-type report-select">
          <select
            required
            name="sale_type"
            className="form-control m-0"
            value={saleType}
            onChange={(e) => setSaleType(e.target.value)}
          >
            <option className="d-none">Select Sale</option>
            <option value="Paid">Paid Sale</option>
            <option value="Due">Due Sale</option>
            <option value="Loan">Loan Sale</option>
            <option value="Return">Return Sale</option>
            <option value="">All</option>
          </select>
          <span></span>
        </div> */}
        <TableTopFromToDate
          dateFilter={dateFilter}
          handleDateFilter={handleDateFilter}
          page="reports"
        />
      </div>
    </form>
  );
};

export default ReportsTableTopFilter;
