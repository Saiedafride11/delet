import React from "react";
import { Outlet } from "react-router-dom";
import DashboardFooter from "../shared/DashboardFooter/DashboardFooter";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
import DashboardSidebar from "../shared/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardSidebar />
      <div className="dashboard-container">
        <DashboardHeader />
        <div>
          <Outlet />
        </div>
        <DashboardFooter />
      </div>
    </>
  );
};

export default DashboardLayout;
