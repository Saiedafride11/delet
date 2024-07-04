import React from "react";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";

const TotalAmount = ({ formValue, handleOnChange }) => {
  // let totalPrice = 0;
  // let totalQuantity = 0;
  // const activePrice = "purchase_price";

  // // const total = cart.reduce((previous, product) => previous + product.price, 0)
  // // const total = formValue?.items?.reduce((previous, item) => previous + item[activePrice] * item.quantity, 0)

  // for (const item of formValue?.items) {
  //   let updatedItem = { ...item };

  //   if (updatedItem.quantity === 0) {
  //     updatedItem.quantity = 1;
  //   }

  //   totalPrice = totalPrice + item.purchase_price * updatedItem.quantity;
  //   // total = total + updatedItem[activePrice] * updatedItem.quantity;
  //   totalQuantity = totalQuantity + updatedItem.quantity;
  // }

  // console.log("formValue", formValue, total, totalQuantity);

  return (
    <div className="balance">
      <div className="w-100">
        <div className="balance-inner-98 mb-3">
          <label>Total Amount</label>
          <div className="total-amount form-control">
            {/* ${getNumberWithCommas(twoDigitFixed(formValue?.total_amount))} */}
            ${getNumberWithCommas(twoDigitFixed(formValue?.grand_total))}
          </div>
        </div>
        <div className="balance-inner-98 mb-3">
          <label>Shipping</label>
          <input
            type="number"
            name="service_charge"
            className="form-control dollar"
            placeholder="0"
            value={
              formValue?.service_charge <= 0 ? "" : formValue?.service_charge
            }
            onChange={handleOnChange}
          />
        </div>
        <div className="balance-inner-98 mb-3">
          <label>VAT/GST</label>
          <div className="two-input-field">
            <div className="position-relative w-100 overflow-hidden">
              <input
                type="number"
                name="vat"
                className="form-control dollar"
                placeholder="0"
                value={formValue?.vat <= 0 ? "" : formValue?.vat}
                onChange={handleOnChange}
              />
              <span className="bg-orange">$</span>
            </div>
            <div className="position-relative w-100 overflow-hidden">
              <input
                type="number"
                name="vat_percent"
                className="form-control percentage"
                placeholder="0"
                value={
                  formValue?.vat_percent <= 0 ? "" : formValue?.vat_percent
                }
                onChange={handleOnChange}
              />
              <span className="bg-green-lg">%</span>
            </div>
          </div>
        </div>
        <div className="balance-inner-98">
          <label>Discount</label>
          <div className="two-input-field">
            <div className="position-relative w-100 overflow-hidden">
              <input
                type="number"
                name="discount"
                className="form-control dollar"
                placeholder="0"
                value={formValue?.discount <= 0 ? "" : formValue?.discount}
                onChange={handleOnChange}
              />
              <span className="bg-orange">$</span>
            </div>
            <div className="position-relative w-100 overflow-hidden">
              <input
                type="number"
                name="discount_percent"
                className="form-control percentage"
                placeholder="0"
                value={
                  formValue?.discount_percent <= 0
                    ? ""
                    : formValue?.discount_percent
                }
                onChange={handleOnChange}
              />
              <span className="bg-green-lg">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAmount;
