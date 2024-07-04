import React from "react";

import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsProductOnChange from "./useSettingsProductOnChange";

const ProductVariation = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
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
    {
      title: "Serial No",
      fieldName: "serial_no",
      fieldValue: settings?.serial_no,
    },
  ];

  const { handleOnChange } = useSettingsProductOnChange(
    formValue,
    setFormValue,
    "variation",
    setError
  );

  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Product Items Variation"
    />
  );
};

export default ProductVariation;
