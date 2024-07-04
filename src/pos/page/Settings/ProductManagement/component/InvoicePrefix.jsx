import React from "react";
import blankImage from "../../../../assets/images/icons/blank-grey.svg";
import { getPrefixDayMonthYearFormat } from "../../../../components/function/getMonthDayYearFormat";

const InvoicePrefix = ({ settings, setPrefixValue }) => {
  const formFields = [
    {
      label: "Sale Prefix",
      checkboxName: "sale_invoice_prefix",
      checkboxValue: settings?.sale_invoice_prefix,
      inputName: "sale_prefix",
      inputValue: settings?.sale_prefix,
    },
    {
      label: "Purchase Prefix",
      checkboxName: "purchase_invoice_prefix",
      checkboxValue: settings?.purchase_invoice_prefix,
      inputName: "purchase_prefix",
      inputValue: settings?.purchase_prefix,
    },
    {
      label: "Sale Due Prefix",
      checkboxName: "sale_due_invoice_prefix",
      checkboxValue: settings?.sale_due_invoice_prefix,
      inputName: "sale_due_prefix",
      inputValue: settings?.sale_due_prefix,
    },
    {
      label: "Purchase due Prefix",
      checkboxName: "purchase_due_invoice_prefix",
      checkboxValue: settings?.purchase_due_invoice_prefix,
      inputName: "purchase_due_prefix",
      inputValue: settings?.purchase_due_prefix,
    },
    {
      label: "Loan Prefix",
      checkboxName: "loan_invoice_prefix",
      checkboxValue: settings?.loan_invoice_prefix,
      inputName: "loan_prefix",
      inputValue: settings?.loan_prefix,
    },
    {
      label: "Sale Return Prefix",
      checkboxName: "sale_return_invoice_prefix",
      checkboxValue: settings?.sale_return_invoice_prefix,
      inputName: "sale_return_prefix",
      inputValue: settings?.sale_return_prefix,
    },
    {
      label: "Purchase Return Prefix",
      checkboxName: "purchase_return_invoice_prefix",
      checkboxValue: settings?.purchase_return_invoice_prefix,
      inputName: "purchase_return_prefix",
      inputValue: settings?.purchase_return_prefix,
    },
    {
      label: "Stock Transfer Prefix",
      checkboxName: "stock_transfer_invoice_prefix",
      checkboxValue: settings?.stock_transfer_invoice_prefix,
      inputName: "stock_transfer_prefix",
      inputValue: settings?.stock_transfer_prefix,
    },
  ];

  const handleOnChange = (e) => {
    const field = e.target.name;
    if (field !== "isChecked") {
      setPrefixValue((prev) => ({
        ...prev,
        [field]: e.target.type === "checkbox" ? !prev[field] : e.target.value,
      }));
    }
  };

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 pt-3 pb-4">
        <h6 className="fw-semibold">Invoice Prefix</h6>
        <img src={blankImage} alt="icon" />
      </div>
      <div>
        {formFields?.map((field, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between mb-2"
          >
            <div className="d-flex align-items-center w-400">
              <input
                type="checkbox"
                className="custom-checkbox-bg"
                id={`invoice_prefix_${index}`}
                name={field?.checkboxName}
                checked={field?.checkboxValue || false}
                onChange={handleOnChange}
              />
              <label
                className="settings-label w-160"
                htmlFor={`invoice_prefix_${index}`}
              >
                {field?.label}:
              </label>
            </div>
            <input
              type="text"
              className="ms-2 form-control py-2"
              placeholder="invoice"
              disabled={!field?.checkboxValue}
              // id={`invoice_prefix_${index}`}
              name={field?.inputName}
              value={
                field?.checkboxValue
                  ? field?.inputValue || ""
                  : getPrefixDayMonthYearFormat() || ""
              }
              onChange={handleOnChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoicePrefix;
