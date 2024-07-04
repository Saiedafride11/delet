import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsProductOnChange from "./useSettingsProductOnChange";

const VatTaxDiscount = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Vat Invoice",
      fieldName: "vat_invoice",
      fieldValue: settings?.vat_invoice,
    },
  ];

  const { handleOnChange } = useSettingsProductOnChange(
    formValue,
    setFormValue,
    "taxes_discount",
    setError
  );

  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Vat, Taxes & Discount"
    />
  );
};

export default VatTaxDiscount;
