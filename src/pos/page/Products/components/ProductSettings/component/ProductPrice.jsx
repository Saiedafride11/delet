import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsProductOnChange from "./useSettingsProductOnChange";

const ProductPrice = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Sale/MRP Price",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "Purchase Price",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "Wholesale Price",
      fieldName: "wholesale_price",
      fieldValue: settings?.wholesale_price,
    },
    {
      title: "Dealer Price",
      fieldName: "dealer_price",
      fieldValue: settings?.dealer_price,
    },
    {
      title: "Product Discount",
      fieldName: "product_discount",
      fieldValue: settings?.product_discount,
    },
  ];

  const { handleOnChange } = useSettingsProductOnChange(
    formValue,
    setFormValue,
    "price",
    setError
  );

  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Product Items Price"
    />
  );
};

export default ProductPrice;
