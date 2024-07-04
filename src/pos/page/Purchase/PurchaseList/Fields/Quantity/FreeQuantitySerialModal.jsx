import React, { useEffect, useState } from "react";
import ProductSerialNumber from "../../../../../components/common/ProductSerialNumber";
import { handlePopupModalClose } from "../../../../../components/function/handlePopupModalClose";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";

const FreeQuantitySerialModal = ({
  formValue,
  setFormValue,
  selectedId,
  setSelectedId,
}) => {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");
  const [serialItems, setSerialItems] = useState([]);

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const matchData = formValue?.items?.find(
      (item) => item?.stock_code === selectedId
    );

    const isFreeExist =
      Object.values(matchData?.exist_free_serial_no).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      ) ||
      Object.values(serialItems).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      );

    const isExist =
      Object.values(matchData?.exist_serial_no).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      ) ||
      Object.values(matchData?.serial_no).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      );

    if (isFreeExist) {
      setError("This serial number is already exist!");
    } else if (isExist) {
      setError("This serial number is already exist with paid serial!");
    } else {
      setSerialItems([...serialItems, inputText]);
      setError("");
      setInputText("");
    }
  };

  const handleRemove = (serialItem) => {
    const filteredObject = serialItems?.filter((item) => item !== serialItem);
    setSerialItems(filteredObject);
    setError("");
    setInputText("");
  };

  const handleSerialSubmit = (e) => {
    e.preventDefault();
    const updatedData = formValue?.items?.map((item) =>
      item?.stock_code === selectedId
        ? {
            ...item,
            free_serial_no: serialItems,
            free_quantity: serialItems?.length,
          }
        : item
    );

    setFormValue((prev) => ({
      ...prev,
      items: updatedData,
    }));

    setSerialItems([]);
    setError("");
    setInputText("");
    setSelectedId("");
    handlePopupModalClose();
    if (serialItems?.length > 0) {
      handleSuccessToast("Serial added successfully");
    }
  };

  const handleClearData = () => {
    setSerialItems([]);
    setError("");
    setInputText("");
    setSelectedId("");
  };

  useEffect(() => {
    const existData = formValue?.items?.find(
      (item) => item?.stock_code === selectedId
    );
    if (existData?.free_serial_no?.length > 0) {
      setSerialItems(existData?.free_serial_no);
    } else {
      setSerialItems([]);
    }
  }, [selectedId]);

  return (
    <ProductSerialNumber
      error={error}
      quantity={serialItems?.length}
      serialItems={serialItems}
      inputText={inputText}
      setInputText={setInputText}
      handleRemove={handleRemove}
      handleItemSubmit={handleItemSubmit}
      handleSerialSubmit={handleSerialSubmit}
      handleClearData={handleClearData}
      modalId="product-free-quantity-modal"
    />
  );
};

export default FreeQuantitySerialModal;
