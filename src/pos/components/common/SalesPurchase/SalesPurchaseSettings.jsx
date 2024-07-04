import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import settingImage from "../../../assets/images/icons/more-setting.svg";
import plusImage from "../../../assets/images/icons/plus-circle-base-color.svg";
import useClickOutside from "../../../hooks/useClickOutside";
import { useUpdateQuickGlobalSettingsMutation } from "../../../redux/features/settings/global/globalSettingsApi";
import { handleResponseErrorMessage } from "../../function/handleResponseErrorMessage";
import Error from "../../ui/Error/Error";
import LineLoader from "../../ui/Spinner/LineLoader";
import { handleSuccessToast } from "../../ui/Toast/handleSuccessToast";

const SalesPurchaseSettings = ({
  globalSettings,
  formValue,
  setFormValue,
  checkBoxItems,
  postSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const {} = useClickOutside(setIsOpen, "sales-purchase-price-settings");

  const [
    updateQuickGlobalSettings,
    {
      data: responseData,
      isSuccess,
      isLoading,
      isFetching,
      error: responseError,
    },
  ] = useUpdateQuickGlobalSettingsMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      // setIsOpen(false);
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleOnChange = (e) => {
    if (globalSettings !== undefined) {
      setError("");
      const field = e.target.name;
      setFormValue((prev) => ({
        ...prev,
        item_info: {
          ...prev?.item_info,
          [field]: !prev?.item_info[field],
        },
      }));

      updateQuickGlobalSettings({
        [postSettings]: {
          ...formValue,
          item_info: {
            ...formValue?.item_info,
            [field]: !formValue?.item_info[field],
          },
        },
      });
    }
  };

  return (
    <>
      {(isLoading || isFetching) && <LineLoader />}
      <div className="d-flex align-items-center justify-content-end gap-2">
        <span>Action</span>
        <div className="sales-purchase-price-settings">
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={plusImage}
            alt="icon"
            className="cursor-pointer"
          />
          <div className={`content ${isOpen ? "d-block" : "d-none"}`}>
            {globalSettings === undefined && (
              <div className="custom-line-loader"></div>
            )}
            {checkBoxItems?.map((data, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  className="custom-checkbox-bg"
                  id={"quick-business-setting" + index}
                  name={data?.fieldName}
                  checked={data?.fieldValue || false}
                  onChange={handleOnChange}
                />
                <label
                  className="settings-label"
                  htmlFor={"quick-business-setting" + index}
                >
                  {data?.title}
                </label>
              </div>
            ))}

            <div className="text-start">
              <img src={settingImage} alt="icon" />
              <Link to="/settings/product-management" className="text-sky ms-1">
                More Settings
              </Link>
            </div>

            {error !== "" && <Error message={error} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPurchaseSettings;
