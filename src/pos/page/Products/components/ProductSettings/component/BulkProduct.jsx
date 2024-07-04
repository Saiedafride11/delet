import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsProductOnChange from "./useSettingsProductOnChange";

const BulkProduct = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Download From",
      fieldName: "download_form",
      fieldValue: settings?.download_form,
    },
    {
      title: "Upload Product",
      fieldName: "upload_form",
      fieldValue: settings?.upload_form,
    },
  ];

  const { handleOnChange } = useSettingsProductOnChange(
    formValue,
    setFormValue,
    "bulk_product",
    setError
  );

  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Bulk Product"
    />
  );
};

export default BulkProduct;
