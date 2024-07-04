import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsProductOnChange from "./useSettingsProductOnChange";

const AddProduct = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
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

  const { handleOnChange } = useSettingsProductOnChange(
    formValue,
    setFormValue,
    "item_info",
    setError
  );
  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Add product/ Item"
    />
  );
};

export default AddProduct;
