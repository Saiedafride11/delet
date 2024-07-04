import React from "react";

const InvoiceTitle = ({ initialData, title }) => {
  return (
    <div className="title text-center my-3">
      <h3>{title}</h3>
      <br />
      <small>Terms of Payment</small>
      <h4 className="text-capitalize">
        {initialData?.payment_type?.name || initialData?.payment_by || "Status"}
      </h4>
    </div>
  );
};

export default InvoiceTitle;
