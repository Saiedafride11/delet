import React, { useEffect, useState } from "react";
import XIcon from "../../../../../assets/images/icons/x-red.svg";
import { handlePopupModalClose } from "../../../../../components/function/handlePopupModalClose";
import Error from "../../../../../components/ui/Error/Error";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";

const FreeQuantitySerialModal = ({
  formValue,
  setFormValue,
  selectedId,
  setSelectedId,
}) => {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");
  const [existSerialItems, setExistSerialItems] = useState([]);
  const [serialItems, setSerialItems] = useState([]);

  const handleSearchChange = (e) => {
    const inputField = e.target.value;

    const existData = formValue?.items?.find(
      (item) => item?.stock_code === selectedId
    );

    const isSelected = existData?.exist_free_serial_no?.filter((item) =>
      item?.toLowerCase().includes(inputField?.toLowerCase())
    );
    if (isSelected) {
      const uniqueArray = isSelected.filter(
        (item) => !serialItems.includes(item)
      );
      setExistSerialItems(uniqueArray);
    }
    if (setError !== inputField) {
      setError("");
    }
    setInputText(inputField);
  };

  const handleItemAdd = (item) => {
    const filteredArray = existSerialItems?.filter((data) => data !== item);
    setExistSerialItems(filteredArray);
    setSerialItems([...serialItems, item]);
    setError("");
  };

  const handleRemove = (item) => {
    const filteredArray = serialItems?.filter((data) => data !== item);
    setSerialItems(filteredArray);
    setExistSerialItems([...existSerialItems, item]);
    setError("");
  };

  const handleSerialSubmit = (e) => {
    e.preventDefault();
    const updatedData = formValue?.items?.map((item) =>
      item?.stock_code === selectedId
        ? {
            ...item,
            free_serial_no: serialItems,
            exist_free_serial_no: existSerialItems,
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
    if (existData?.exist_free_serial_no?.length > 0) {
      const newExistSerial = existData?.exist_free_serial_no?.filter(
        (item) =>
          !existData?.sale_free_serial_no.includes(item) &&
          !existData?.free_serial_no.includes(item)
      );
      setExistSerialItems(newExistSerial);
    } else {
      setExistSerialItems([]);
    }
    if (existData?.free_serial_no?.length > 0) {
      setSerialItems(existData?.free_serial_no);
    } else {
      setSerialItems([]);
    }
  }, [selectedId]);

  return (
    <div
      className="modal fade modal-custom-design serial-item-modal"
      id="product-free-quantity-modal"
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
                <label className="col-form-label mb-0">
                  {existSerialItems?.length || 0}/{serialItems?.length || 0}{" "}
                  Entered
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
                {existSerialItems?.length === 0 ? (
                  <label className="col-form-label fw-medium">
                    No Serial Number Found!
                  </label>
                ) : (
                  <div className="row">
                    {existSerialItems?.map((item) => (
                      <div key={item} className="col-6">
                        <label
                          onClick={() => handleItemAdd(item)}
                          className="col-form-label fw-medium cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {serialItems?.length > 0 && (
                <div className="serial-number max-h-140">
                  <div className="row">
                    {serialItems?.map((item) => (
                      <div key={item} className="col-6">
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="col-form-label fw-medium mb-0">
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

export default React.memo(FreeQuantitySerialModal);
