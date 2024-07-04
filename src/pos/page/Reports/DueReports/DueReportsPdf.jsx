import React from "react";
import DueReportsTableUI from "./DueReportsTableUI";

const DueReportsPdf = ({
  updateDueList,
  isLoading,
  isError,
  dataFrom,
  total_due,
}) => {
  return (
    <div className="acnoo-dashboard-main-section print-d-none d-none">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper px-4">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2">Due Reports</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="responsive-table">
              <table className="table" id="due-report-table">
                <DueReportsTableUI
                  updateDueList={updateDueList}
                  isLoading={isLoading}
                  isError={isError}
                  page="pdf"
                  dataFrom={dataFrom}
                  total_due={total_due}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueReportsPdf;
