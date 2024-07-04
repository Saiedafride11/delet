import React from "react";
import QuickSettingsSwitchItems from "../../../../../components/common/QuickSettingsSwitchItems";
import useSettingsPartyOnChange from "./useSettingsPartyOnChange";

const PartyAddress = ({ settings, formValue, setFormValue, setError }) => {
  const switchItems = [
    {
      title: "Address",
      fieldName: "address",
      fieldValue: settings?.address,
    },
    {
      title: "Email",
      fieldName: "email",
      fieldValue: settings?.email,
    },
    {
      title: "Nid Passport",
      fieldName: "nid_passport",
      fieldValue: settings?.nid_passport,
    },
  ];

  const { handleOnChange } = useSettingsPartyOnChange(
    formValue,
    setFormValue,
    "address",
    setError
  );
  return (
    <QuickSettingsSwitchItems
      switchItems={switchItems}
      handleOnChange={handleOnChange}
      title="Party Address"
    />
  );
};

export default PartyAddress;
