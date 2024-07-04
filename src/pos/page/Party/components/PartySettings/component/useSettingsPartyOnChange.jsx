import { useEffect } from "react";
import { handleResponseErrorMessage } from "../../../../../components/function/handleResponseErrorMessage";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";
import { useUpdateQuickGlobalSettingsMutation } from "../../../../../redux/features/settings/global/globalSettingsApi";

const useSettingsPartyOnChange = (
  formValue,
  setFormValue,
  dynamicKey,
  setError
) => {
  const [
    updateQuickGlobalSettings,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useUpdateQuickGlobalSettingsMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleOnChange = (e) => {
    setError("");
    const field = e.target.name;
    if (field !== "isChecked") {
      setFormValue((prev) => ({
        ...prev,
        [dynamicKey]: {
          ...prev[dynamicKey],
          [field]: !prev[dynamicKey][field],
        },
      }));

      updateQuickGlobalSettings({
        party_settings: {
          ...formValue,
          [dynamicKey]: {
            ...formValue[dynamicKey],
            [field]: !formValue[dynamicKey][field],
          },
        },
      });
    }
  };

  return { handleOnChange };
};

export default useSettingsPartyOnChange;
