import React from "react";
import CheckboxItems from "./CheckboxItems";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const VatTaxDiscount = ({ settings, setFormValue }) => {
  const checkBoxItems = [
    {
      title: "Vat Invoice",
      fieldName: "vat_invoice",
      fieldValue: settings?.vat_invoice,
    },
    {
      title: "Purchase Price Tax",
      fieldName: "purchase_price_tax",
      fieldValue: settings?.purchase_price_tax,
    },
    {
      title: "Sale Price Tax",
      fieldName: "sale_price_tax",
      fieldValue: settings?.sale_price_tax,
    },
  ];

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "taxes_discount"
  );

  return (
    <CheckboxItems
      checkBoxItems={checkBoxItems}
      handleOnChange={handleOnChange}
      title="Vat, Taxes & Discount"
    />
  );
};

export default VatTaxDiscount;
