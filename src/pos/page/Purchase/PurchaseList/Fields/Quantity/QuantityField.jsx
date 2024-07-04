import React from "react";
import minusSquareIcon from "../../../../../assets/images/icons/minus-square.svg";
import plusSquareIcon from "../../../../../assets/images/icons/plus-square.svg";
import { twoDigitFixed } from "../../../../../components/function/twoDigitFixed";

const QuantityField = ({ data, formValue, setFormValue }) => {
  const handleQuantity = (stockCode, text) => {
    // let updatedData;
    // if (text === "plus") {
    //   updatedData = formValue?.items?.map((item) =>
    //     item?.id === id ? { ...item, quantity: item?.quantity + 1 } : item
    //   );
    // } else if (text === "minus") {
    //   updatedData = formValue?.items?.map((item) =>
    //     item?.id === id ? { ...item, quantity: item?.quantity - 1 } : item
    //   );
    // } else {
    //   updatedData = formValue?.items?.map((item) =>
    //     item?.id === id ? { ...item, quantity: parseInt(text) } : item
    //   );
    // }

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
                : parseInt(inputValue),
          }
        : item
    );

    const totalAmount = updatedData?.reduce(
      (total, item) => total + item.purchase_price * item.quantity,
      0
    );

    setFormValue((prev) => {
      const { vat, service_charge, discount, paid_amount } = prev;
      const grandTotal =
        totalAmount + Number(vat) + Number(service_charge) - Number(discount);

      return {
        ...prev,
        items: updatedData,
        total_amount: totalAmount,
        grand_total: twoDigitFixed(grandTotal),
        due_amount: twoDigitFixed(grandTotal - Number(paid_amount)),
      };
    });

    // setFormValue((prev) => ({
    //   ...prev,
    //   items: updatedData,
    //   total_amount: totalAmount,
    //   grand_total: twoDigitFixed(
    //     totalAmount +
    //       Number(prev?.vat) +
    //       Number(prev?.service_charge) -
    //       Number(prev?.discount)
    //   ),
    //   due_amount: twoDigitFixed(
    //     totalAmount +
    //       Number(prev?.vat) +
    //       Number(prev?.service_charge) -
    //       Number(prev?.discount)
    //   ),
    //   paid_amount: 0,
    // }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        onClick={() => handleQuantity(data?.stock_code, "minus")}
        disabled={data?.exist_serial_no?.length > 0 || data?.quantity <= 0}
        className={`p-0 m-0 border-0 bg-transparent ${
          (data?.exist_serial_no?.length > 0 && "opacity-50") ||
          data?.exist_serial_no?.length > 0 ||
          (data?.quantity <= 0 && "opacity-50")
        }`}
      >
        <img src={minusSquareIcon} alt="icon" />
      </button>
      {/* <h6 className="mx-2">6</h6> */}
      <input
        type="number"
        disabled={data?.exist_serial_no?.length > 0}
        className="form-control w-55 text-center fw-bold border-0 bg-transparent px-1"
        placeholder="0"
        value={data?.quantity <= 0 ? "" : data.quantity}
        onChange={(e) => handleQuantity(data?.stock_code, e.target.value)}
      />
      <button
        onClick={() => handleQuantity(data?.stock_code, "plus")}
        disabled={data?.exist_serial_no?.length > 0}
        className={`p-0 m-0 border-0 bg-transparent ${
          data?.exist_serial_no?.length > 0 && "opacity-50"
        }`}
      >
        <img src={plusSquareIcon} alt="icon" />
      </button>
    </div>
  );
};

export default QuantityField;
