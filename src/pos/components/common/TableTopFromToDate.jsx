import React from "react";
import { convertDateToISO } from "../function/convertDateToISO";
import { customISODate } from "../function/customISODate";

const TableTopFromToDate = ({
  dateFilter,
  handleDateFilter,
  page,
  component,
}) => {
  const currentDate = customISODate();
  const convertedFromDate = convertDateToISO(dateFilter?.startDate);
  return (
    <div className="d-flex align-items-center gap-2 section-two">
      <div
        className={`input-wrapper pos-up-down-arrow w-130 ${
          page === "reports" && "report-select"
        } ${component === "dueReports" ? "due-report-date" : ""}`}
      >
        <select
          value={dateFilter?.selectedFilter}
          onChange={handleDateFilter}
          className="form-control m-0"
        >
          <option value="Custom" className="d-none">
            Custom
          </option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <span></span>
      </div>
      <div className="d-flex border rounded-2 form-to-date">
        <button
          type="button"
          className={`border-0 ${page === "reports" && "report-date-button"}
        `}
        >
          Between
        </button>
        <div className="d-flex align-items-center">
          <input
            type="date"
            name="form_date"
            className="form-control border-0 w-130"
            value={dateFilter?.selectedStartDate}
            onChange={handleDateFilter}
            max={currentDate}
          />
          <span className="fw-bolder">To</span>
          <input
            type="date"
            name="to_date"
            className="form-control border-0 w-130"
            value={dateFilter?.selectedEndDate}
            onChange={handleDateFilter}
            min={convertedFromDate}
            max={currentDate}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TableTopFromToDate);
