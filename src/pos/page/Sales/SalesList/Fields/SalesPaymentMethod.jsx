import React from "react";
import { useGetPaymentTypeQuery } from "../../../../redux/features/payment/paymentApi";

const SalesPaymentMethod = ({ formValue, handleOnChange }) => {
  const { data: paymentType, isLoading, isError } = useGetPaymentTypeQuery();
  const items = paymentType?.data?.payment_types;
  return (
    <div className="input-wrapper pos-up-down-arrow">
      <select
        name="payment_type_id"
        value={formValue?.payment_type_id}
        onChange={handleOnChange}
        className="form-control m-0"
        required
      >
        <option className="d-none text-gray-sm">Choose One</option>
        {items?.length === 0 || items === undefined || isLoading || isError ? (
          <option>No data found!</option>
        ) : (
          items?.map((item) => (
            <option
              key={item?.id}
              value={item?.id}
              className={
                (formValue?.credit_cash === "Cash" && item?.name === "Due") ||
                (formValue?.credit_cash === "Cash" &&
                  item?.name === "Wallet") ||
                (formValue?.credit_cash === "Cash" && item?.name === "Credit")
                  ? "d-none"
                  : ""
              }
            >
              {item?.name}
            </option>
          ))
        )}
      </select>
      <span></span>
    </div>
  );
};

export default SalesPaymentMethod;
