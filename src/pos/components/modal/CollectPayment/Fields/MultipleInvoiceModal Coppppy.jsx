import React, { useEffect, useState } from "react";
import XIcon from "../../../../../assets/images/icons/x-red.svg";
import { handlePopupModalClose } from "../../../../../components/function/handlePopupModalClose";
import { twoDigitFixed } from "../../../../../components/function/twoDigitFixed";
import Error from "../../../../../components/ui/Error/Error";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";
// import { handlePopupModalClose } from "../../../../components/function/handlePopupModalClose";
// import Error from "../../../../components/ui/Error/Error";
// import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";

const QuantitySerialModal = ({
  formValue,
  setFormValue,
  selectedId,
  setSelectedId,
}) => {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");
  const [existSerialItems, setExistSerialItems] = useState([]);
  const [serialItems, setSerialItems] = useState([]);
  const [existFreeSerialItems, setExistFreeSerialItems] = useState([]);
  const [freeSerialItems, setFreeSerialItems] = useState([]);

  const handleSearchChange = (e) => {
    const inputField = e.target.value;
    const existData = formValue?.items?.find(
      (item) => item?.stock_code === selectedId
    );

    const matchedSerial = existData?.exist_serial_no?.filter((item) =>
      item?.toLowerCase().includes(inputField?.toLowerCase())
    );

    const matchedFreeSerial = existData?.exist_free_serial_no?.filter((item) =>
      item?.toLowerCase().includes(inputField?.toLowerCase())
    );

    if (matchedSerial) {
      const uniqueArray = matchedSerial.filter(
        (item) => !serialItems.includes(item)
      );
      setExistSerialItems(uniqueArray);
    }
    if (matchedFreeSerial) {
      const uniqueArray = matchedFreeSerial.filter(
        (item) => !freeSerialItems.includes(item)
      );
      setExistFreeSerialItems(uniqueArray);
    }
    if (setError !== inputField) {
      setError("");
    }
    setInputText(inputField);
  };

  const handleItemAdd = (item) => {
    const matchedFreeSerial = existFreeSerialItems?.includes(item);

    if (matchedFreeSerial) {
      const filteredArray = existFreeSerialItems?.filter(
        (data) => data !== item
      );
      setExistFreeSerialItems(filteredArray);
      setFreeSerialItems([...freeSerialItems, item]);
    } else {
      const filteredArray = existSerialItems?.filter((data) => data !== item);
      setExistSerialItems(filteredArray);
      setSerialItems([...serialItems, item]);
    }
    setError("");
  };

  const handleRemove = (item) => {
    const matchedFreeSerial = freeSerialItems?.includes(item);
    if (matchedFreeSerial) {
      const filteredArray = freeSerialItems?.filter((data) => data !== item);
      setFreeSerialItems(filteredArray);
      setExistFreeSerialItems([...existFreeSerialItems, item]);
    } else {
      const filteredArray = serialItems?.filter((data) => data !== item);
      setSerialItems(filteredArray);
      setExistSerialItems([...existSerialItems, item]);
    }
    setError("");
  };

  const handleSerialSubmit = (e) => {
    e.preventDefault();
    const updatedData = formValue?.items?.map((item) =>
      item?.stock_code === selectedId
        ? {
            ...item,
            serial_no: serialItems,
            exist_serial_no: existSerialItems,
            quantity: serialItems?.length + freeSerialItems?.length,
            sale_free_serial_no: freeSerialItems,
            sale_free_quantity: freeSerialItems?.length,
          }
        : item
    );

    const totalAmount = updatedData?.reduce(
      (total, item) => total + item?.sale_price * item.quantity,
      0
    );

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
    setFreeSerialItems([]);
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
    setFreeSerialItems([]);
    setError("");
    setInputText("");
    setSelectedId("");
  };

  useEffect(() => {
    const existData = formValue?.items?.find(
      (item) => item?.stock_code === selectedId
    );

    // ------------------------------------------------
    // Paid serial
    // ------------------------------------------------
    if (existData?.exist_serial_no?.length > 0) {
      const newExistSerial = existData?.exist_serial_no?.filter(
        (item) => !existData?.serial_no.includes(item)
      );
      setExistSerialItems(newExistSerial);
      // setExistSerialItems(existData?.exist_serial_no);
    } else {
      setExistSerialItems([]);
    }
    if (existData?.serial_no?.length > 0) {
      setSerialItems(existData?.serial_no);
    } else {
      setSerialItems([]);
    }
    // ------------------------------------------------
    // Free serial
    // ------------------------------------------------
    if (existData?.exist_free_serial_no?.length > 0) {
      const newExistSerial = existData?.exist_free_serial_no?.filter(
        (item) =>
          !existData?.sale_free_serial_no.includes(item) &&
          !existData?.free_serial_no.includes(item)
      );
      setExistFreeSerialItems(newExistSerial);
    } else {
      setExistFreeSerialItems([]);
    }
    if (existData?.sale_free_serial_no?.length > 0) {
      setFreeSerialItems(existData?.sale_free_serial_no);
    } else {
      setFreeSerialItems([]);
    }
  }, [selectedId]);

  // console.log("freeSerialItems", freeSerialItems);

  let combinedItems = existSerialItems.concat(existFreeSerialItems);
  let combinedSelectedItems = serialItems.concat(freeSerialItems);
  // console.log(combinedArray);
  // console.log("combinedSelectedItems", combinedSelectedItems);

  return (
    <div
      className="modal fade modal-custom-design serial-item-modal"
      id="product-quantity-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Opening Stock - {existSerialItems?.length || 0}
              </h1>
              <h6 className="text-secondary">Item</h6>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClearData}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between">
                <label className="col-form-label fw-medium">
                  Serial Number
                </label>
                <label className="col-form-label">
                  {combinedItems?.length || 0}/
                  {combinedSelectedItems?.length || 0} Entered
                </label>
              </div>
              <div className="add-scan">
                <input
                  type="search"
                  required
                  className="form-control"
                  placeholder="Search..."
                  value={inputText}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="serial-number">
                {combinedItems?.length === 0 ? (
                  <label className="col-form-label fw-medium">
                    No Serial Number Found!
                  </label>
                ) : (
                  <div className="row">
                    {combinedItems?.map((item) => (
                      <div key={item} className="col-6">
                        <label
                          onClick={() => handleItemAdd(item)}
                          className={`col-form-label fw-medium cursor-pointer mb-0 ${
                            existFreeSerialItems?.includes(item)
                              ? "text-orange"
                              : ""
                          }`}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {combinedSelectedItems?.length > 0 && (
                <div className="serial-number max-h-140">
                  <div className="row">
                    {combinedSelectedItems?.map((item) => (
                      <div key={item} className="col-6">
                        <div className="d-flex align-items-center justify-content-between">
                          <label
                            className={`col-form-label fw-medium mb-0 ${
                              freeSerialItems?.includes(item)
                                ? "text-orange"
                                : ""
                            }`}
                          >
                            {item}
                          </label>
                          <img
                            onClick={() => handleRemove(item)}
                            src={XIcon}
                            alt="icon"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-center">
            <div className="button-group">
              <button
                onClick={handleClearData}
                className="btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn save-btn"
                // disabled={serialItems?.length === 0}
                onClick={handleSerialSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className="px-3 pb-2">
            {error !== "" && <Error message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuantitySerialModal);
