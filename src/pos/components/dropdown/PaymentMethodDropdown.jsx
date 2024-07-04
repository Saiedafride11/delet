import React from "react";
import { useGetPaymentTypeQuery } from "../../redux/features/payment/paymentApi";
import SelectOption from "../common/SelectOption";

const PaymentMethodDropdown = ({ value, handleOnChange }) => {
  const { data: paymentType, isLoading, isError } = useGetPaymentTypeQuery();
  const initialData = paymentType?.data?.payment_types;
  return (
    <div className="input-wrapper pos-up-down-arrow">
      <SelectOption
        name="payment_type_id"
        value={value}
        handleOnChange={handleOnChange}
        title="Choose One"
        items={initialData}
        isLoading={isLoading}
        isError={isError}
      />
      <span></span>
    </div>
  );
};

export default PaymentMethodDropdown;
