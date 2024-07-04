import { useEffect } from "react";
import { handleErrorModalWithCross } from "../components/ui/Toast/handleErrorModalWithCross";
import { handleSuccessToast } from "../components/ui/Toast/handleSuccessToast";

const useStatusChange = (
  updateCategoryStatusFunc,
  responseError,
  responseSuccess,
  responseData
) => {
  useEffect(() => {
    if (responseError !== undefined) {
      handleErrorModalWithCross(responseError);
    } else if (responseSuccess) {
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, responseSuccess, responseData]);

  const handleStatusChange = (id, status) => {
    const toggleStatus = status === 1 ? 0 : 1;
    updateCategoryStatusFunc({ id, status: toggleStatus });
  };

  return { handleStatusChange };
};

export default useStatusChange;
