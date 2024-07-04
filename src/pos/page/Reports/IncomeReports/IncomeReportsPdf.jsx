import React from "react";
import IncomeReportsTableUI from "./IncomeReportsTableUI";

const IncomeReportsPdf = ({ incomeData, isLoading, isError }) => {
  return (
    <div className="acnoo-dashboard-main-section print-d-none d-none">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper px-4">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2">Income Reports</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="responsive-table">
              <table className="table" id="income-report-table">
                <IncomeReportsTableUI
                  incomeData={incomeData}
                  isLoading={isLoading}
                  isError={isError}
                  page="pdf"
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeReportsPdf;
