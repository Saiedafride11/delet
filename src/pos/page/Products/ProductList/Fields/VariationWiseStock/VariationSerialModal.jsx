import React, { useState } from "react";
import { handleSerialModalClose } from "../../../../../components/function/handlePopupModalClose";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";
import VariationSerialNumber from "./VariationSerialNumber";

const VariationSerialModal = ({
  formValue,
  serialItems,
  setSerialItems,
  freeSerialItems,
  variationValue,
  setVariationValue,
  selectedKey,
}) => {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // Single Serial Add
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  const handleItemSubmit = (e) => {
    e.preventDefault();

    const isExist = Object.entries(serialItems)?.some(
      ([key, value]) =>
        key.startsWith(`variation[${selectedKey}][serial_no][`) &&
        value.toLowerCase() === inputText.toLowerCase()
    );

    const isFreeExist = Object.entries(freeSerialItems)?.some(
      ([key, value]) =>
        key.startsWith(`variation[${selectedKey}][free_serial_no][`) &&
        value.toLowerCase() === inputText.toLowerCase()
    );

    if (isExist) {
      setError("This serial number is already exist!");
    } else if (isFreeExist) {
      setError("This serial number is already exist with free serial!");
    } else {
      const maxIndex =
        Object.keys(serialItems).reduce((max, key) => {
          // const match = key.match(/^variation\[0]\[serial_no]\[(\d+)\]$/);
          const match = key.match(/^variation\[\w+\]\[serial_no]\[(\d+)\]$/);

          if (match) {
            const index = parseInt(match[1]);
            return Math.max(max, index);
          }
          return max;
        }, -1) + 1;

      const keyDefined = `variation[${selectedKey}][serial_no]`;
      const indexDefined =
        serialItems[`${keyDefined}[0]`] === "" ? 0 : maxIndex;

      setSerialItems((prevState) => ({
        ...prevState,
        [`${keyDefined}[${indexDefined}]`]: inputText,
        // [`variation[${selectedKey}][serial_no][${maxIndex}]`]: inputText,
      }));
      setError("");
      setInputText("");
    }
  };
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // Single Serial Remove
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  const handleRemove = (key) => {
    const minimumOneValue = Object.entries(serialItems)?.filter(
      ([key, value]) =>
        key.startsWith(`variation[${selectedKey}][serial_no][`) && value !== ""
    )?.length;
    if (minimumOneValue === 1) {
      setSerialItems((prev) => ({
        ...prev,
        [key]: "",
      }));
    } else {
      const { [key]: removedKey, ...updatedData } = serialItems;
      setSerialItems(updatedData);
    }

    setError("");
    setInputText("");
  };
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  //Serial Submit
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  const handleSerialSubmit = (e) => {
    e.preventDefault();

    Object.keys(formValue).forEach((key) => {
      if (key.startsWith(`variation[${selectedKey}][serial_no][`)) {
        delete formValue[key];
      }
    });

    Object.keys(variationValue).forEach((key) => {
      if (key.startsWith(`variation[${selectedKey}][serial_no][`)) {
        delete variationValue[key];
      }
    });

    const variationLength = Object.entries(serialItems)?.filter(
      ([key, value]) =>
        key.startsWith(`variation[${selectedKey}][serial_no][`) && value !== ""
    )?.length;

    setVariationValue((prev) => ({
      ...prev,
      ...serialItems,
      [`variation[${selectedKey}][quantity]`]: variationLength,
      [`variation[${selectedKey}][free_quantity]`]:
        variationValue[
          Object.keys(variationValue)?.find((key) =>
            key.startsWith(`variation[${selectedKey}][free_serial_no]`)
          )
        ] === ""
          ? 0
          : prev[`variation[${selectedKey}][free_quantity]`],
    }));

    setError("");
    setInputText("");
    handleSerialModalClose();
    if (variationLength > 0) {
      handleSuccessToast("Serial added successfully");
    }
  };
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // Close Modal and state clear
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  const handleClearData = () => {
    setError("");
    setInputText("");
    const filteredObject = {};
    for (const key in variationValue) {
      if (key.includes("[serial_no][")) {
        filteredObject[key] = variationValue[key];
      }
    }
    setSerialItems(filteredObject);
  };

  return (
    <div
      className="modal fade modal-custom-design serial-item-modal"
      id="variation-serial-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        {/* <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Opening Stock -{" "}
                {variationValue[`variation[${selectedKey}][quantity]`] || 0}
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
            <form onSubmit={handleItemSubmit}>
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label fw-medium">
                    Serial Number
                  </label>
                  <label className="col-form-label">
                    {
                      Object.entries(serialItems)?.filter(
                        ([key, value]) =>
                          key.startsWith(
                            `variation[${selectedKey}][serial_no][`
                          ) && value !== ""
                      )?.length
                    }
                    /
                    {variationValue[`variation[${selectedKey}][quantity]`] || 0}{" "}
                    Entered
                  </label>
                </div>
                <div className="add-scan">
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter/Scan"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit">Add</button>
                </div>
                <div className="serial-number">
                  {Object.entries(serialItems)?.filter(
                    ([key, value]) =>
                      key.startsWith(`variation[${selectedKey}][serial_no][`) &&
                      value !== ""
                  )?.length === 0 ? (
                    <label className="col-form-label fw-medium">
                      No Serial Number Found!
                    </label>
                  ) : (
                    Object.entries(serialItems)
                      .filter(
                        ([key, value]) =>
                          key.startsWith(
                            `variation[${selectedKey}][serial_no][`
                          ) && value !== ""
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <label className="col-form-label fw-medium">
                            {value}
                          </label>
                          <img
                            onClick={() => handleRemove(key)}
                            src={XIcon}
                            alt="icon"
                          />
                        </div>
                      ))
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-center">
            <div className="button-group">
              <button
                type="button"
                onClick={handleClearData}
                className="btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn save-btn"
                // disabled={
                //   Object.entries(serialItems)?.filter(
                //     ([key, value]) =>
                //       key.startsWith(`variation[${selectedKey}][serial_no][`) &&
                //       value !== ""
                //   )?.length === 0
                // }
                onClick={handleSerialSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className="px-3 pb-2">
            {error !== "" && <Error message={error} />}
          </div>
        </div> */}

        <VariationSerialNumber
          error={error}
          inputText={inputText}
          setInputText={setInputText}
          selectedKey={selectedKey}
          quantityKey="quantity"
          serialKey="serial_no"
          serialItems={serialItems}
          variationValue={variationValue}
          handleClearData={handleClearData}
          handleItemSubmit={handleItemSubmit}
          handleSerialSubmit={handleSerialSubmit}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
};

export default VariationSerialModal;
