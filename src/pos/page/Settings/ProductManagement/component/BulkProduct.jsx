import React from "react";
import CheckboxItems from "./CheckboxItems";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const BulkProduct = ({ settings, setFormValue }) => {
  const checkBoxItems = [
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

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "bulk_product"
  );

  return (
    <CheckboxItems
      checkBoxItems={checkBoxItems}
      handleOnChange={handleOnChange}
      title="Bulk Product"
    />
  );
};

export default BulkProduct;
