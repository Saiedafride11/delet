import React, { useState } from "react";
import ProductSerialNumber from "../../../../components/common/ProductSerialNumber";
import { handleSerialModalClose } from "../../../../components/function/handlePopupModalClose";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";

const ProductFreeSerialModal = ({
  formValue,
  setFormValue,
  freeSerialItems,
  setFreeSerialItems,
  serialItems,
}) => {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");

  const handleItemSubmit = (e) => {
    e.preventDefault();

    const isFreeExist = Object.values(freeSerialItems).some(
      (v) => v.toLowerCase() === inputText.toLowerCase()
    );

    const isExist = Object.values(serialItems).some(
      (v) => v.toLowerCase() === inputText.toLowerCase()
    );

    if (isFreeExist) {
      setError("This serial number is already exist!");
    } else if (isExist) {
      setError("This serial number is already exist with paid serial!");
    } else {
      const maxIndex =
        Object.keys(freeSerialItems).reduce(
          (max, key) =>
            ((match) => (match ? Math.max(parseInt(match[1], 10), max) : max))(
              key.match(/\[(\d+)\]/)
            ),
          -1
        ) + 1;

      setFreeSerialItems((prevState) => ({
        ...prevState,
        [`free_serial_no[${maxIndex}]`]: inputText,
      }));
      setError("");
      setInputText("");
    }
  };

  const handleRemove = (serialItem) => {
    const filteredObject = {};
    Object.keys(freeSerialItems)?.forEach((key) => {
      if (freeSerialItems[key] !== serialItem) {
        filteredObject[key] = freeSerialItems[key];
      }
    });
    setFreeSerialItems(filteredObject);
    setError("");
    setInputText("");
  };

  const handleSerialSubmit = (e) => {
    e.preventDefault();

    Object.keys(formValue).forEach((key) => {
      if (key.startsWith("free_serial_no[")) {
        delete formValue[key];
      }
    });

    setFormValue((prevValue) => ({
      ...prevValue,
      ...freeSerialItems,
      free_quantity: Object?.keys(freeSerialItems)?.length,
      quantity: !Object.keys(formValue).some((key) =>
        key.startsWith("serial_no[")
      )
        ? 0
        : prevValue?.quantity,
    }));

    setError("");
    setInputText("");
    handleSerialModalClose();
    if (Object?.keys(freeSerialItems)?.length > 0) {
      handleSuccessToast("Serial added successfully");
    }
  };

  const handleClearData = () => {
    const filteredObject = {};
    for (const key in formValue) {
      if (key.startsWith("free_serial_no[")) {
        filteredObject[key] = formValue[key];
      }
    }
    setFreeSerialItems(filteredObject);

    setError("");
    setInputText("");
  };

  return (
    <ProductSerialNumber
      error={error}
      quantity={formValue?.free_quantity}
      serialItems={freeSerialItems}
      inputText={inputText}
      setInputText={setInputText}
      handleRemove={handleRemove}
      handleItemSubmit={handleItemSubmit}
      handleSerialSubmit={handleSerialSubmit}
      handleClearData={handleClearData}
      modalId="product-free-qty-serial-modal"
    />
  );
};

export default ProductFreeSerialModal;
