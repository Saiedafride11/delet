import { useEffect } from "react";
import { handlePopupModalClose } from "../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../components/function/handleResponseErrorMessage";
import { handleSuccessToast } from "../components/ui/Toast/handleSuccessToast";

const useSingleDataDelete = (
  deleteItemFunc,
  responseError,
  responseSuccess,
  setError,
  text
) => {
  const handleDelete = (id) => {
    if (id) {
      deleteItemFunc(id);
    }
  };

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (responseSuccess) {
      setError("");
      handlePopupModalClose();
      handleSuccessToast(`${text} deleted successfully`);
    }
  }, [responseError, responseSuccess]);

  return { handleDelete };
};

export default useSingleDataDelete;
