import React from "react";

import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsProductOnChange from "./useSettingsProductOnChange";

const ProductStock = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Quantity",
      fieldName: "isChecked",
      fieldValue: true,
    },
    {
      title: "Free Items Qty",
      fieldName: "free_quantity",
      fieldValue: settings?.free_quantity,
    },
    {
      title: "Low Stock QTY",
      fieldName: "low_quantity",
      fieldValue: settings?.low_quantity,
    },
    {
      title: "Serial No",
      fieldName: "serial_no",
      fieldValue: settings?.serial_no,
    },
    {
      title: "Product Units",
      fieldName: "unit",
      fieldValue: settings?.unit,
    },
    {
      title: "Expire Date",
      fieldName: "expire_date",
      fieldValue: settings?.expire_date,
    },
    {
      title: "Manufacture",
      fieldName: "manufacturer",
      fieldValue: settings?.manufacturer,
    },
    {
      title: "Manufacture Date",
      fieldName: "manufacturer_date",
      fieldValue: settings?.manufacturer_date,
    },
  ];

  const { handleOnChange } = useSettingsProductOnChange(
    formValue,
    setFormValue,
    "item_stock",
    setError
  );

  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Product Items Stock"
    />
  );
};

export default ProductStock;
