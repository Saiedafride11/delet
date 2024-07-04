import { useEffect, useState } from "react";
import { handlePopupModalClose } from "../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../components/function/handleResponseErrorMessage";
import { handleSuccessToast } from "../components/ui/Toast/handleSuccessToast";

const useSingleDataCreateUpdate = (
  addItemFunc,
  addResponseData,
  addIsSuccess,
  addResponseError,
  editItemFunc,
  editResponseData,
  editIsSuccess,
  editResponseError,
  updateData,
  setUpdateData
) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // ----------------------------------------------
  // Create Data
  // ----------------------------------------------

  useEffect(() => {
    if (addResponseError !== undefined) {
      handleResponseErrorMessage(addResponseError, setError);
    } else if (addIsSuccess) {
      setName("");
      setError("");
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addItemFunc({ name });
  };

  // ----------------------------------------------
  // update Data
  // ----------------------------------------------
  useEffect(() => {
    if (updateData?.name !== undefined) {
      setName(updateData.name);
    }
  }, [updateData]);

  useEffect(() => {
    if (editResponseError !== undefined) {
      handleResponseErrorMessage(editResponseError, setError);
    } else if (editIsSuccess) {
      setName("");
      setError("");
      setUpdateData({});
      handlePopupModalClose();
      handleSuccessToast(editResponseData?.message?.message);
    }
  }, [editResponseError, editIsSuccess, editResponseData, setUpdateData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editItemFunc({
      id: updateData?.id,
      data: { name },
    });
  };

  const handleClearState = () => {
    setName("");
    setError("");
    setUpdateData({});
  };
  return {
    handleAddSubmit,
    handleEditSubmit,
    handleClearState,
    error,
    name,
    setName,
  };
};

export default useSingleDataCreateUpdate;
