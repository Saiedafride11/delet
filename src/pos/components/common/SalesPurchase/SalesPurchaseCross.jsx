import React from "react";
import crossIcon from "../../../assets/images/icons/x-red.svg";
import { twoDigitFixed } from "../../function/twoDigitFixed";

const SalesPurchaseCross = ({
  totalAmountKey,
  data,
  formValue,
  setFormValue,
}) => {
  const handleRemove = (data) => {
    const newProducts = formValue?.items?.filter(
      (item) => item?.stock_code !== data?.stock_code
    );

    const totalAmount = newProducts?.reduce(
      (total, item) => total + item[totalAmountKey] * item.quantity,
      0
    );
    setFormValue((prev) => ({
      ...prev,
      items: newProducts,
      total_amount: totalAmount,
      grand_total: twoDigitFixed(
        totalAmount +
          Number(prev?.vat) +
          Number(prev?.service_charge) -
          Number(prev?.discount)
      ),
      due_amount: twoDigitFixed(
        totalAmount +
          Number(prev?.vat) +
          Number(prev?.service_charge) -
          Number(prev?.discount) -
          Number(prev?.paid_amount)
      ),
    }));
  };

  return (
    <div className="cross">
      <img
        onClick={() => handleRemove(data)}
        src={crossIcon}
        alt="icon"
        className="cursor-pointer"
      />
    </div>
  );
};

export default SalesPurchaseCross;
