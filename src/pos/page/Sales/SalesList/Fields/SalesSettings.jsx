import React, { useEffect, useState } from "react";
import SalesPurchaseSettings from "../../../../components/common/SalesPurchase/SalesPurchaseSettings";
import { useGetGlobalSettingsQuery } from "../../../../redux/features/settings/global/globalSettingsApi";

const SalesSettings = () => {
  const {
    data: globalSettingsData,
    isLoading,
    isError,
  } = useGetGlobalSettingsQuery();
  const globalSettings = globalSettingsData?.data?.value?.sale_settings;

  const [formValue, setFormValue] = useState({});
  const [apiFirstCall, setApiFirstCall] = useState(false);

  //--------------------------------------------------------
  //--------------------------------------------------------
  // just i am api response data received first time,
  // another time no receive api response.
  // because checkbox toggle very bad, api update but ui show local response
  //--------------------------------------------------------
  //--------------------------------------------------------
  useEffect(() => {
    if (globalSettings !== undefined && apiFirstCall === false) {
      setFormValue(globalSettings);
    }
  }, [globalSettings, apiFirstCall]);

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setApiFirstCall(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------

  const checkBoxItems = [
    {
      title: "Unit",
      fieldName: "unit",
      fieldValue: formValue?.item_info?.unit,
    },
    {
      title: "Serial No",
      fieldName: "serial_no",
      fieldValue: formValue?.item_info?.serial_no,
    },
    {
      title: "Free Quantity",
      fieldName: "free_quantity",
      fieldValue: formValue?.item_info?.free_quantity,
    },
    {
      title: "Discount",
      fieldName: "discount",
      fieldValue: formValue?.item_info?.discount,
    },
    // {
    //   title: "Wholesale Price",
    //   fieldName: "wholesale_price",
    //   fieldValue: formValue?.item_info?.wholesale_price,
    // },
    // {
    //   title: "Dealer Price",
    //   fieldName: "dealer_price",
    //   fieldValue: formValue?.item_info?.dealer_price,
    // },
  ];

  return (
    <SalesPurchaseSettings
      globalSettings={globalSettings}
      formValue={formValue}
      setFormValue={setFormValue}
      checkBoxItems={checkBoxItems}
      postSettings="sale_settings"
    />
  );
};

export default SalesSettings;
