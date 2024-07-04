import { useEffect, useState } from "react";
import { handlePopupModalClose } from "../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../components/function/handleResponseErrorMessage";
import { handleSuccessToast } from "../components/ui/Toast/handleSuccessToast";

const useMultipleDataDelete = (
  items,
  deleteItemsFunc,
  responseError,
  multiDeleteIsSuccess,
  setError,
  text
) => {
  const [selectItems, setSelectItems] = useState([]);
  const [checkedItems, setCheckedItem] = useState(false);

  const handleItemsSelect = (itemId) => {
    const isSelected = selectItems.includes(itemId);
    const newItems = isSelected
      ? selectItems?.filter((id) => id !== itemId)
      : [...selectItems, itemId];
    setSelectItems(newItems);
    setCheckedItem(false);
  };

  const handleMultipleSelect = () => {
    const newSelectItems = checkedItems ? [] : items?.map((data) => data.id);
    setSelectItems(newSelectItems);
    setCheckedItem(!checkedItems);
  };

  const handleMultipleDelete = () => {
    deleteItemsFunc({ ids: selectItems });
  };

  useEffect(() => {
    if (responseError !== undefined) {
      // handleErrorModalWithCross(responseError);
      handleResponseErrorMessage(responseError, setError);
      setSelectItems([]);
      setCheckedItem(false);
    } else if (multiDeleteIsSuccess) {
      setSelectItems([]);
      setCheckedItem(false);
      handlePopupModalClose();
      handleSuccessToast(`Multiple ${text} data deleted successfully`);
    }
  }, [responseError, multiDeleteIsSuccess]);

  const handleResetMultipleSelect = () => {
    setSelectItems([]);
    setCheckedItem(false);
  };

  return {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  };
};

export default useMultipleDataDelete;
