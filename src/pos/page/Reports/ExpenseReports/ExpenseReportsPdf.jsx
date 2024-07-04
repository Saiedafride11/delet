import React from "react";
import ExpenseReportsTableUI from "./ExpenseReportsTableUI";

const ExpenseReportsPdf = ({ expenseData, isLoading, isError }) => {
  return (
    <div className="acnoo-dashboard-main-section print-d-none d-none">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper px-4">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2">Expense Reports</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="responsive-table">
              <table className="table" id="expense-report-table">
                <ExpenseReportsTableUI
                  expenseData={expenseData}
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

export default ExpenseReportsPdf;
