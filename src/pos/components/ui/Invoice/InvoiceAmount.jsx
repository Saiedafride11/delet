import React from "react";
import { convertNumberToWords } from "../../function/convertNumberToWords";
import { getNumberWithCommas } from "../../function/getNumberWithCommas";
import { twoDigitFixed } from "../../function/twoDigitFixed";

const InvoiceAmount = ({ initialData }) => {
  return (
    <div className="amount-section">
      <div className="d-flex align-items-center pe-5">
        <p>
          <strong>Amounts in words : </strong>{" "}
          {convertNumberToWords(initialData?.grand_total)}
        </p>
      </div>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Sub-Total</p>
          <p>
            {getNumberWithCommas(twoDigitFixed(initialData?.total_amount || 0))}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Discount {initialData?.discount_percent || 0}%</p>
          <p>
            {getNumberWithCommas(twoDigitFixed(initialData?.discount || 0))}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Added VAT {initialData?.vat_percent || 0}%</p>
          <p>{getNumberWithCommas(twoDigitFixed(initialData?.vat || 0))}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Add Service Charges</p>
          <p>
            {getNumberWithCommas(
              twoDigitFixed(initialData?.service_charge || 0)
            )}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between amount">
          <h5>Total Amount</h5>
          <h5>
            {getNumberWithCommas(twoDigitFixed(initialData?.grand_total || 0))}
          </h5>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Receive Amount</p>
          <p>
            {getNumberWithCommas(twoDigitFixed(initialData?.paid_amount || 0))}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Previous Due</p>
          <p>
            {getNumberWithCommas(twoDigitFixed(initialData?.previous_due || 0))}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between amount">
          <h5>Current Due Amount</h5>
          <h5>
            {getNumberWithCommas(
              twoDigitFixed(initialData?.payable_due_amount || 0)
            )}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAmount;
