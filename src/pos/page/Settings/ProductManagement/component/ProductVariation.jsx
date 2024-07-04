import React from "react";
import CheckboxItems from "./CheckboxItems";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const ProductVariation = ({ settings, setFormValue }) => {
  const checkBoxItems = [
    {
      title: "Variation menu",
      fieldName: "variation_menu",
      fieldValue: settings?.variation_menu,
    },
    {
      title: "Size",
      fieldName: "size",
      fieldValue: settings?.size,
    },
    {
      title: "Color",
      fieldName: "color",
      fieldValue: settings?.color,
    },
    {
      title: "Weight",
      fieldName: "weight",
      fieldValue: settings?.weight,
    },
    {
      title: "Type",
      fieldName: "type",
      fieldValue: settings?.type,
    },
    {
      title: "Capacity",
      fieldName: "capacity",
      fieldValue: settings?.capacity,
    },
  ];

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "variation"
  );

  return (
    <CheckboxItems
      checkBoxItems={checkBoxItems}
      handleOnChange={handleOnChange}
      title="Product Items Variation"
    />
  );
};

export default ProductVariation;
