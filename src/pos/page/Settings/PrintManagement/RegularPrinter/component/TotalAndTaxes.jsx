import React from "react";
import blankImage from "../../../../../assets/images/icons/blank-grey.svg";

const TotalAndTaxes = () => {
  const checkBoxItems = [
    {
      title: "Total Amount",
      fieldName: "warehouse",
      fieldValue: true,
    },
    {
      title: "Total Item Quantity",
      fieldName: "sku_code",
      fieldValue: true,
    },
    {
      title: "Less Discount",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "VAT",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "Service Charges",
      fieldName: "brand",
      fieldValue: true,
    },
    {
      title: "Net Payable Amount",
      fieldName: "model",
      fieldValue: true,
    },
    {
      title: " Previous Due Amount",
      fieldName: "shipping_service_charge",
      fieldValue: true,
    },
    {
      title: "Due Amount",
      fieldName: "image",
      fieldValue: true,
    },
    {
      title: "Received Amount",
      fieldName: "warranty",
      fieldValue: true,
    },
    {
      title: "Current Amount",
      fieldName: "description",
      fieldValue: true,
    },
  ];

  // const { handleOnChange } = useSettingProductsManageOnChange(
  //   setFormValue,
  //   "item_info"
  // );
  const handleOnChange = () => {};
  const title = "Add product/ Item";
  return (
    <div className="mb-4">
      <h6 className="pt-3 mb-3 fw-semibold">Totals & Taxes</h6>
      {checkBoxItems?.map((data, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <input
            type="checkbox"
            className="custom-checkbox-bg"
            id={title?.replace(/\s/g, "") + index}
            name={data?.fieldName}
            checked={data?.fieldValue || false}
            onChange={handleOnChange}
          />
          <label
            className="settings-label"
            htmlFor={title?.replace(/\s/g, "") + index}
          >
            {data?.title}
          </label>
          <img src={blankImage} alt="icon" className="ms-1 w-16" />
        </div>
      ))}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Amount in Words</p>
        <div className="d-flex align-items-center">
          <input
            type="number"
            className="form-control ms-2 w-98"
            placeholder="1"
          />
          <img src={blankImage} alt="icon" className="ms-2 w-16" />
        </div>
      </div>
    </div>
  );
};

export default TotalAndTaxes;
