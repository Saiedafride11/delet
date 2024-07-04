import React from "react";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";

const TotalAmount = ({ formValue }) => {
  return (
    <div className="balance">
      <div className="w-100">
        <div className="balance-inner-98 mb-16">
          <label>Total Amount</label>
          <div className="total-amount form-control text-end">
            ${getNumberWithCommas(twoDigitFixed(formValue?.total_amount))}
          </div>
        </div>
        <div className="balance-inner-98 mb-16">
          <label>Invoice Total</label>
          <div className="total-amount form-control text-end bg-white text-black">
            $
            {getNumberWithCommas(
              twoDigitFixed(formValue?.invoice_amount?.grandTotal)
            )}
          </div>
        </div>
        <div className="balance-inner-98 mb-16">
          <label>Invoice Paid</label>
          <div className="total-amount form-control text-end bg-white text-black">
            $
            {getNumberWithCommas(
              twoDigitFixed(formValue?.invoice_amount?.paidAmount)
            )}
          </div>
        </div>
        <div className="balance-inner-98">
          <label>Invoice Due</label>
          <div className="total-amount form-control text-end bg-white text-black">
            $
            {getNumberWithCommas(
              twoDigitFixed(formValue?.invoice_amount?.dueAmount)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAmount;
