import React from "react";
import { twoDigitFixed } from "../../function/twoDigitFixed";

const SalesPurchasePricing = ({
  name,
  totalAmountKey,
  data,
  formValue,
  setFormValue,
}) => {
  const custom_sale_price =
    formValue?.party_type == 2
      ? "dealer_price"
      : formValue?.party_type == 4
      ? "wholesale_price"
      : "exist_unit_price";

  const handlePriceChange = (e, data) => {
    const name = e.target.name;
    const value = e.target.value;
    const updateValue = value === "" || value < 0 ? 0 : value;

    let updatedData = formValue?.items?.map((item) =>
      item.stock_code === data?.stock_code
        ? {
            ...item,
            [name]: twoDigitFixed(updateValue),
            discount:
              totalAmountKey === "sale_price"
                ? item?.discount_type === "Fixed"
                  ? twoDigitFixed(item[custom_sale_price] - Number(updateValue))
                  : twoDigitFixed(
                      100 -
                        (Number(updateValue) / item[custom_sale_price]) * 100
                    )
                : item?.discount,
          }
        : item
    );

    const totalAmount = updatedData?.reduce(
      (total, item) => total + item[totalAmountKey] * item.quantity,
      0
    );

    setFormValue((prev) => ({
      ...prev,
      items: updatedData,
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
    <div className="d-flex align-items-center justify-content-center">
      <span>$</span>
      <input
        type="number"
        name={name}
        className="form-control w-60 text-start border-0 bg-transparent ps-0 pe-1"
        placeholder="0"
        value={data?.[name] <= 0 ? "" : data?.[name]}
        onChange={(e) => handlePriceChange(e, data)}
      />
    </div>
  );
};

export default SalesPurchasePricing;

// const formatNumber = str => {
//   const num = parseFloat(str);
//   return num % 1 !== 0 ? num.toFixed(2) : num.toString();
// };

// // Test cases
// console.log(formatNumber("100.898888")); // Output: "100.90"
// console.log(formatNumber("200")); // Output: "200"

// item.stock_code === data?.stock_code
// ? {
//     ...item,
//     [name]: updateValue,
//     discount:
//       totalAmountKey === "sale_price"
//         ? item?.discount_type === "Fixed"
//           ? item[custom_sale_price] - Number(updateValue)
//           : toDigitFixed(
//               100 -
//                 (Number(updateValue) / item[custom_sale_price]) * 100
//             )
//         : item?.discount,
//   }
// : item
