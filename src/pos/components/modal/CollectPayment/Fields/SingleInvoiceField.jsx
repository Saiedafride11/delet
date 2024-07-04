import React, { useEffect, useState } from "react";

const SingleInvoiceField = ({
  setFormValue,
  getSingleInvoice,
  getPartyOpeningDue,
}) => {
  const [invoiceNo, setInvoiceNo] = useState("");
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Without Invoice Select, Single Invoice
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  useEffect(() => {
    if (
      getSingleInvoice !== undefined &&
      Object.keys(getSingleInvoice).length !== 0
    ) {
      setInvoiceNo(getSingleInvoice?.invoice);
      setFormValue((prev) => ({
        ...prev,
        ids: [getSingleInvoice.id],
        payable_due_amount: getSingleInvoice?.payable_due_amount,
      }));
    }
  }, [getSingleInvoice]);

  useEffect(() => {
    if (getPartyOpeningDue?.party_id !== "") {
      setInvoiceNo("Party Due");
      setFormValue((prev) => ({
        ...prev,
        ids: [null],
        payable_due_amount: Math.abs(getPartyOpeningDue?.balance),
        amount: 0,
      }));
    }
  }, [getPartyOpeningDue?.party_id]);

  return (
    <div className="custom-focus-label">
      <label>Invoice No</label>
      <div className="input-wrapper pos-up-down-arrow">
        <div className="w-100">
          <input
            readOnly
            value={invoiceNo || ""}
            type="text"
            placeholder="Enter invoice"
            className="form-control m-0 search-select-option-input"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleInvoiceField;
