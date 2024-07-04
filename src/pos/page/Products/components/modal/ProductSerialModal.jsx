import React, { useState } from "react";
import ProductSerialNumber from "../../../../components/common/ProductSerialNumber";
import { handleSerialModalClose } from "../../../../components/function/handlePopupModalClose";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";

const ProductSerialModal = ({
  formValue,
  setFormValue,
  serialItems,
  setSerialItems,
  freeSerialItems,
}) => {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");

  const handleItemSubmit = (e) => {
    e.preventDefault();

    const isExist = Object.values(serialItems).some(
      (v) => v.toLowerCase() === inputText.toLowerCase()
    );

    const isFreeExist = Object.values(freeSerialItems).some(
      (v) => v.toLowerCase() === inputText.toLowerCase()
    );

    if (isExist) {
      setError("This serial number is already exist!");
    } else if (isFreeExist) {
      setError("This serial number is already exist with free serial!");
    } else {
      const maxIndex =
        Object.keys(serialItems).reduce(
          (max, key) =>
            ((match) => (match ? Math.max(parseInt(match[1], 10), max) : max))(
              key.match(/\[(\d+)\]/)
            ),
          -1
        ) + 1;

      setSerialItems((prevState) => ({
        ...prevState,
        [`serial_no[${maxIndex}]`]: inputText,
      }));
      setError("");
      setInputText("");
    }
  };

  const handleRemove = (serialItem) => {
    const filteredObject = {};
    Object.keys(serialItems)?.forEach((key) => {
      if (serialItems[key] !== serialItem) {
        filteredObject[key] = serialItems[key];
      }
    });
    setSerialItems(filteredObject);
    setError("");
    setInputText("");
  };

  const handleSerialSubmit = (e) => {
    e.preventDefault();

    Object.keys(formValue).forEach((key) => {
      if (key.startsWith("serial_no[")) {
        delete formValue[key];
      }
    });

    setFormValue((prevValue) => ({
      ...prevValue,
      ...serialItems,
      quantity: Object?.keys(serialItems)?.length,
      free_quantity: !Object.keys(formValue).some((key) =>
        key.startsWith("free_serial_no[")
      )
        ? 0
        : prevValue?.free_quantity,
    }));

    setError("");
    setInputText("");
    handleSerialModalClose();
    if (Object?.keys(serialItems)?.length > 0) {
      handleSuccessToast("Serial added successfully");
    }
  };

  const handleClearData = () => {
    const filteredObject = {};
    for (const key in formValue) {
      if (key.startsWith("serial_no[")) {
        filteredObject[key] = formValue[key];
      }
    }
    setSerialItems(filteredObject);

    setError("");
    setInputText("");
  };

  return (
    <ProductSerialNumber
      error={error}
      quantity={formValue?.quantity}
      serialItems={serialItems}
      inputText={inputText}
      setInputText={setInputText}
      handleRemove={handleRemove}
      handleItemSubmit={handleItemSubmit}
      handleSerialSubmit={handleSerialSubmit}
      handleClearData={handleClearData}
      modalId="product-qty-serial-modal"
    />
  );
};

export default ProductSerialModal;
