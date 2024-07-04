import React from "react";
import CheckboxItems from "./CheckboxItems";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const AddProduct = ({ settings, setFormValue }) => {
  const checkBoxItems = [
    {
      title: "Warehouse",
      fieldName: "warehouse",
      fieldValue: settings?.warehouse,
    },
    {
      title: "Product code",
      fieldName: "sku_code",
      fieldValue: settings?.sku_code,
    },
    {
      title: "Product Name",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "Category",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "Brand",
      fieldName: "brand",
      fieldValue: settings?.brand,
    },
    {
      title: "Model",
      fieldName: "model",
      fieldValue: settings?.model,
    },
    {
      title: "Shipping Charge",
      fieldName: "shipping_service_charge",
      fieldValue: settings?.shipping_service_charge,
    },
    {
      title: "Product Image",
      fieldName: "image",
      fieldValue: settings?.image,
    },
    {
      title: "Warranty",
      fieldName: "warranty",
      fieldValue: settings?.warranty,
    },
    {
      title: "Description",
      fieldName: "description",
      fieldValue: settings?.description,
    },
  ];

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "item_info"
  );

  return (
    <CheckboxItems
      checkBoxItems={checkBoxItems}
      handleOnChange={handleOnChange}
      title="Add product/ Item"
    />
  );
};

export default AddProduct;
