import React from "react";
import minusSquareIcon from "../../../../../assets/images/icons/minus-square.svg";
import plusSquareIcon from "../../../../../assets/images/icons/plus-square.svg";
import { twoDigitFixed } from "../../../../../components/function/twoDigitFixed";

const QuantityField = ({ data, formValue, setFormValue }) => {
  const handleQuantity = (stockCode, text) => {
    const inputValue = text === "" ? 0 : text;

    let updatedData = (formValue?.items || []).map((item) =>
      item.stock_code === stockCode
        ? {
            ...item,
            quantity:
              text === "plus"
                ? item.quantity + 1
                : text === "minus"
                ? item.quantity - 1
                : item?.purchased_quantity < parseInt(inputValue)
                ? 0
                : parseInt(inputValue),
          }
        : item
    );

    const totalAmount = updatedData?.reduce(
      (total, item) => total + item.purchase_price * item.quantity,
      0
    );

    setFormValue((prev) => ({
      ...prev,
      items: updatedData,
      total_amount: twoDigitFixed(totalAmount),
      paid_amount: twoDigitFixed(totalAmount),
      grand_total: twoDigitFixed(totalAmount),
    }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        onClick={() => handleQuantity(data?.stock_code, "minus")}
        disabled={data?.exist_serial_no?.length > 0 || data?.quantity <= 0}
        className={`p-0 m-0 border-0 bg-transparent ${
          (data?.exist_serial_no?.length > 0 && "opacity-50") ||
          (data?.quantity <= 0 && "opacity-50")
        }`}
      >
        <img src={minusSquareIcon} alt="icon" />
      </button>
      {/* <h6 className="mx-2">6</h6> */}
      <input
        type="number"
        disabled={
          data?.exist_serial_no?.length > 0 ||
          data?.purchased_quantity < data?.quantity
        }
        className="form-control w-55 text-center fw-bold border-0 bg-transparent px-1"
        placeholder="0"
        value={data?.quantity <= 0 ? "" : data.quantity}
        onChange={(e) => handleQuantity(data?.stock_code, e.target.value)}
      />
      <button
        onClick={() => handleQuantity(data?.stock_code, "plus")}
        disabled={
          data?.exist_serial_no?.length > 0 ||
          data?.purchased_quantity <= data?.quantity
        }
        className={`p-0 m-0 border-0 bg-transparent ${
          (data?.exist_serial_no?.length > 0 && "opacity-50") ||
          (data?.purchased_quantity <= data?.quantity && "opacity-50")
        }`}
      >
        <img src={plusSquareIcon} alt="icon" />
      </button>
    </div>
  );
};

export default QuantityField;
