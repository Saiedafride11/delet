import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { reportsMenu } from "./reportsMenu";

const ReportsSidebarMenu = () => {
  const location = useLocation();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [bottomReached, setBottomReached] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const currentPosition = scrollTop + clientHeight;
      const isBottomReached = scrollHeight - currentPosition <= 50;
      setBottomReached(isBottomReached);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const thirdRoute = `/${location?.pathname?.split("/")[1]}/${
    location?.pathname?.split("/")[2]
  }`;
  return (
    <div
      className={`reports-sidebar-section ${
        scrollPosition > 82 ? "pt-0" : "pt-70"
      }`}
    >
      <div className={`reports-sidebar ${bottomReached ? "" : "scroll82"}`}>
        <h6>All Reports</h6>
        <ul>
          {reportsMenu?.map((data, index) => (
            <li key={index}>
              <Link
                to={`/reports${data?.route === "" ? "" : `/${data?.route}`}`}
              >
                <span
                  className={`${
                    `/reports${data?.route === "" ? "" : `/${data?.route}`}` ===
                      location?.pathname ||
                    `/reports/${data?.route}` === thirdRoute
                      ? "report-menu-active"
                      : ""
                  }`}
                >
                  {data?.title}
                </span>
                <span
                  className={`${
                    `/reports${data?.route === "" ? "" : `/${data?.route}`}` ===
                    location?.pathname
                      ? "report-menu-active"
                      : ""
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                    <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportsSidebarMenu;
