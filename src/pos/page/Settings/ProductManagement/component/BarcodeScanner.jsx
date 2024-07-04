import React from "react";
import CheckboxItems from "./CheckboxItems";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const BarcodeScanner = ({ settings, setFormValue }) => {
  const checkBoxItems = [
    {
      title: "Barcode Scanner",
      fieldName: "barcode_scanner",
      fieldValue: settings?.barcode_scanner,
    },
    {
      title: "USB Scanner",
      fieldName: "usb_scanner",
      fieldValue: settings?.usb_scanner,
    },
  ];

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "scanner_settings"
  );

  return (
    <CheckboxItems
      checkBoxItems={checkBoxItems}
      handleOnChange={handleOnChange}
      title="Barcode Scanner setting"
    />
  );
};

export default BarcodeScanner;
