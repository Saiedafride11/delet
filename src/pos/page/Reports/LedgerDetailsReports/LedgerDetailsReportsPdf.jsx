import React from "react";
import LedgerDetailsReportsTableUI from "./LedgerDetailsReportsTableUI";

const LedgerDetailsReportsPdf = ({
  ledgerData,
  isLoading,
  isError,
  selectedPage,
  dateFilter,
}) => {
  return (
    <div className="acnoo-dashboard-main-section print-d-none d-none">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper px-4">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2">Sales Reports</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="responsive-table">
              <table className="table" id="ledger-report-details-table">
                <LedgerDetailsReportsTableUI
                  ledgerData={ledgerData}
                  isLoading={isLoading}
                  isError={isError}
                  page="pdf"
                  selectedPage={selectedPage}
                  dateFilter={dateFilter}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerDetailsReportsPdf;
