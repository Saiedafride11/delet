import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsPartyOnChange from "./useSettingsPartyOnChange";

const PartyReference = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Reference",
      fieldName: "reference",
      fieldValue: settings?.reference,
    },
  ];

  const { handleOnChange } = useSettingsPartyOnChange(
    formValue,
    setFormValue,
    "reference",
    setError
  );
  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Party Reference"
    />
  );
};

export default PartyReference;
