import React from "react";
import { Link } from "react-router-dom";

const DashboardFooter = () => {
  return (
    <footer className="print-d-none bg-white py-4 position-relative">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <div className="">
          <p className="mb-0">
            Development by:
            <Link to="https://acnoo.com/" target="_blank" className="text-sky">
              &nbsp;Acnoo
            </Link>
          </p>
        </div>
        <div className="">
          <p className="mb-0">
            Copyright ©{new Date()?.getFullYear()} Acnoo, All rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
