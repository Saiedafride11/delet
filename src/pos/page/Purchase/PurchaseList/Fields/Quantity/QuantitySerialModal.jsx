import React, { useEffect, useState } from "react";
import ProductSerialNumber from "../../../../../components/common/ProductSerialNumber";
import { handlePopupModalClose } from "../../../../../components/function/handlePopupModalClose";
import { twoDigitFixed } from "../../../../../components/function/twoDigitFixed";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";

const QuantitySerialModal = ({
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

    const isExist =
      Object.values(matchData?.exist_serial_no).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      ) ||
      Object.values(serialItems).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      );

    const isFreeExist =
      Object.values(matchData?.exist_free_serial_no).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      ) ||
      Object.values(matchData?.free_serial_no).some(
        (v) => v.toLowerCase() === inputText.toLowerCase()
      );

    if (isExist) {
      setError("This serial number is already exist!");
    } else if (isFreeExist) {
      setError("This serial number is already exist with free serial!");
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
        ? { ...item, serial_no: serialItems, quantity: serialItems?.length }
        : item
    );

    const totalAmount = updatedData?.reduce((total, item) => {
      const itemPurchasePrice = item.purchase_price * item.quantity;
      return total + itemPurchasePrice;
    }, 0);

    setFormValue((prev) => {
      const { vat, service_charge, discount, paid_amount } = prev;
      const grandTotal =
        totalAmount + Number(vat) + Number(service_charge) - Number(discount);

      return {
        ...prev,
        items: updatedData,
        total_amount: totalAmount,
        grand_total: twoDigitFixed(grandTotal),
        due_amount: twoDigitFixed(grandTotal - Number(paid_amount)),
      };
    });

    // setFormValue((prev) => ({
    //   ...prev,
    //   items: updatedData,
    //   total_amount: totalAmount,
    //   grand_total: twoDigitFixed(
    //     totalAmount +
    //       Number(prev?.vat) +
    //       Number(prev?.service_charge) -
    //       Number(prev?.discount)
    //   ),
    //   due_amount: twoDigitFixed(
    //     totalAmount +
    //       Number(prev?.vat) +
    //       Number(prev?.service_charge) -
    //       Number(prev?.discount)
    //   ),
    //   paid_amount: 0,
    // }));

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
    if (existData?.serial_no?.length > 0) {
      setSerialItems(existData?.serial_no);
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
      modalId="product-quantity-modal"
    />
  );
};

export default QuantitySerialModal;
