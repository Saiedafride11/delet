import React from "react";
import SalesReturnReportsTableUI from "./SalesReturnReportsTableUI";

const SalesReturnReportsPdf = ({ saleReturnData, isLoading, isError }) => {
  return (
    <div className="acnoo-dashboard-main-section print-d-none d-none">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper px-4">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2">Sales Return Reports</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="responsive-table">
              <table className="table" id="sales-return-report-table">
                <SalesReturnReportsTableUI
                  saleReturnData={saleReturnData}
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

export default SalesReturnReportsPdf;
