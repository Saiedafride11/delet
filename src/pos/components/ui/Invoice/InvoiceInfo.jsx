import React from "react";
import { getDayMonthYearFormat } from "../../function/getMonthDayYearFormat";

const InvoiceInfo = ({ items }) => {
  return (
    <div className="invoice-info">
      <ul>
        <li>
          <strong>Customer</strong> <strong>:</strong> {items?.party?.name}
        </li>
        <li>
          <strong>Mobile</strong>
          <strong>:</strong> {items?.party?.phone || "N/A"}
        </li>
        <li>
          <strong>Address</strong>
          <strong>:</strong> {items?.party?.address || "N/A"}
        </li>
        {/* <li>
          <strong>Remarks</strong> <strong>:</strong>N/A
        </li> */}
      </ul>
      <ul>
        <li>
          <strong>Invoice No</strong>
          <strong>:</strong> {items?.prefix + items?.invoice}
        </li>
        <li>
          <strong>Date</strong> <strong>:</strong>
          {getDayMonthYearFormat(
            items?.sale_date?.split(" ")[0] ||
              items?.purchase_date?.split(" ")[0] ||
              items?.return_date?.split(" ")[0]
          )}
        </li>
        <li>
          <strong>Sold By</strong>
          <strong>:</strong> {items?.user?.name || "N/A"}
        </li>
        {/* <li>
          <strong>Sale By</strong>
          <strong>:</strong>
          {items?.user?.name || "N/A"}
        </li> */}
      </ul>
    </div>
  );
};

export default InvoiceInfo;
