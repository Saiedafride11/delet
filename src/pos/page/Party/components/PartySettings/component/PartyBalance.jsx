import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsPartyOnChange from "./useSettingsPartyOnChange";

const PartyBalance = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Credit Limit",
      fieldName: "credit_limit",
      fieldValue: settings?.credit_limit,
    },
    {
      title: "Date",
      fieldName: "date",
      fieldValue: settings?.date,
    },
  ];

  const { handleOnChange } = useSettingsPartyOnChange(
    formValue,
    setFormValue,
    "balance",
    setError
  );
  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Party Balance"
    />
  );
};

export default PartyBalance;
