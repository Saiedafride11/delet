import React from "react";
import { Link, useLocation } from "react-router-dom";

const TableTopFilterTabs = ({ filterTabs }) => {
  const location = useLocation();
  return (
    <div className="pos-filter-tab print-d-none">
      {filterTabs?.map((tab, index) => (
        <Link
          to={tab?.route}
          key={index}
          className={tab?.route === location.pathname ? "active" : ""}
        >
          {tab?.title}
        </Link>
      ))}
    </div>
  );
};

export default TableTopFilterTabs;
