import React from "react";

const AllMonthDropdown = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="input-wrapper pos-up-down-arrow w-130">
      <select className="form-control m-0">
        <option className="d-none text-gray-sm">This Month</option>
        {months?.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <span></span>
    </div>
  );
};

export default AllMonthDropdown;
