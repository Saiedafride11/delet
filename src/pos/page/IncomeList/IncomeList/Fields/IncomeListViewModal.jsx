import React from "react";
import { getMonthDayYearFormat } from "../../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";

const IncomeListViewModal = ({ updateData, setUpdateData }) => {
  return (
    <div
      className="modal fade modal-custom-design"
      id="pos-view-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              View Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setUpdateData({})}
            ></button>
          </div>
          <div className="modal-body">
            <div className="view-description">
              <ul>
                <li>
                  <span>Date</span> <span>:</span>
                  <strong>
                    {updateData?.income_date !== null
                      ? getMonthDayYearFormat(updateData?.income_date)
                      : "----"}
                  </strong>
                </li>
                <li>
                  <span>Income for</span> <span>:</span>
                  <strong>{updateData?.sector || "----"}</strong>
                </li>
                <li>
                  <span>Category</span> <span>:</span>
                  <strong>
                    {updateData?.income_expense_category?.name || "----"}
                  </strong>
                </li>
                <li>
                  <span>Amount</span> <span>:</span>
                  <strong>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(updateData?.amount || 0)
                    )}
                  </strong>
                </li>
                <li>
                  <span>Payment type</span> <span>:</span>
                  <strong>{updateData?.payment_type || "----"}</strong>
                </li>
                <li>
                  <span>Note</span> <span>:</span>
                  <strong>{updateData?.note || "----"}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IncomeListViewModal);
