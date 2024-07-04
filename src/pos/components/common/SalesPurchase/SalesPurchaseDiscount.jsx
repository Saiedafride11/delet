import React from "react";
import { twoDigitFixed } from "../../function/twoDigitFixed";
import { handleErrorModalWithCross } from "../../ui/Toast/handleErrorModalWithCross";

const SalesPurchaseDiscount = ({
  dynamicKey,
  data,
  formValue,
  setFormValue,
}) => {
  const handleDiscountChange = (e, data) => {
    const name = e.target.name;
    const value = e.target.value;
    const updateValue = value === "" ? 0 : value;

    let updatedData = formValue?.items?.find(
      (item) => item.stock_code === data?.stock_code
    );

    if (name === "discount") {
      if (updatedData?.discount_type === "Percentage") {
        if (value > 100) {
          handleErrorModalWithCross("Percent less than or equal 100");
          updatedData.discount = 0;
        } else if (value < 1) {
          updatedData.discount = 0;
        } else {
          updatedData.discount = twoDigitFixed(value);
        }
      } else {
        if (parseInt(value) > parseInt(updatedData[dynamicKey])) {
          handleErrorModalWithCross(
            "Discount less than or equal to main price"
          );
          updatedData.discount = 0;
        } else if (value < 1) {
          updatedData.discount = 0;
        } else {
          updatedData.discount = twoDigitFixed(value);
        }
      }
    } else if (name === "discount_type") {
      (updatedData.discount = 0), (updatedData.discount_type = value);
    }

    let updatedItems = formValue?.items?.map((item) =>
      item.stock_code === updatedData?.stock_code ? updatedData : item
    );

    setFormValue((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };
  return (
    <div className="input-select-option d-flex align-items-center justify-content-center">
      <input
        type="number"
        name="discount"
        className="form-control w-60 text-start  px-1"
        placeholder="0"
        disabled={
          data[dynamicKey] === "" || data[dynamicKey] <= 0 ? true : false
        }
        value={data?.discount < 0 ? "" : data.discount}
        onChange={(e) => handleDiscountChange(e, data)}
      />
      <div className="w-40">
        <select
          name="discount_type"
          value={data?.discount_type === "Fixed" ? "$" : "%"}
          onChange={(e) => handleDiscountChange(e, data)}
          className="form-control m-0 ps-14"
        >
          <option className="d-none">
            {data?.discount_type === "Fixed" ? "$" : "%"}
          </option>
          <option className="text-start" value="Fixed">
            Fixed
          </option>
          <option className="text-start" value="Percentage">
            Percentage
          </option>
        </select>
      </div>
    </div>
  );
};

export default SalesPurchaseDiscount;
