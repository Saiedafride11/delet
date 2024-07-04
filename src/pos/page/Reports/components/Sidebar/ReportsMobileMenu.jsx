import React from "react";
import { Link, useLocation } from "react-router-dom";
import { reportsMenu } from "./reportsMenu";

const ReportsMobileMenu = () => {
  const location = useLocation();

  const thirdRoute = `/${location?.pathname?.split("/")[1]}/${
    location?.pathname?.split("/")[2]
  }`;

  return (
    <div className="pos-filter-tab print-d-none reports-mobile-menu">
      {reportsMenu?.map((tab, index) => (
        <Link
          to={`/reports${tab?.route === "" ? "" : `/${tab?.route}`}`}
          key={index}
          className={`${
            `/reports${tab?.route === "" ? "" : `/${tab?.route}`}` ===
              location?.pathname || `/reports/${tab?.route}` === thirdRoute
              ? "active"
              : ""
          }`}
        >
          {tab?.title}
        </Link>
      ))}
    </div>
  );
};

export default ReportsMobileMenu;
