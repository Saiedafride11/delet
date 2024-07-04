import React from "react";
import CheckboxItems from "./CheckboxItems";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const ProductPrice = ({ settings, setFormValue }) => {
  const checkBoxItems = [
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
      title: "Discount Sales",
      fieldName: "product_discount",
      fieldValue: settings?.product_discount,
    },
  ];

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "price"
  );

  return (
    <CheckboxItems
      checkBoxItems={checkBoxItems}
      handleOnChange={handleOnChange}
      title="Product Items Price"
    />
  );
};

export default ProductPrice;
