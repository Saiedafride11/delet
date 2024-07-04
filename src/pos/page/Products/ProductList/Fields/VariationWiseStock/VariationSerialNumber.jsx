import React, { useRef } from "react";
import XIcon from "../../../../../assets/images/icons/x-red.svg";
import Error from "../../../../../components/ui/Error/Error";

const VariationSerialNumber = ({
  error,
  inputText,
  setInputText,
  selectedKey,
  quantityKey,
  serialKey,
  serialItems,
  variationValue,
  handleClearData,
  handleItemSubmit,
  handleSerialSubmit,
  handleRemove,
}) => {
  const inputRef = useRef(null);
  return (
    <div className="modal-content">
      <div className="modal-header">
        <div>
          <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
            Opening Stock -{" "}
            {variationValue[`variation[${selectedKey}][${quantityKey}]`] || 0}
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
              <label className="col-form-label fw-medium">Serial Number</label>
              <label className="col-form-label">
                {
                  Object.entries(serialItems)?.filter(
                    ([key, value]) =>
                      key.startsWith(
                        `variation[${selectedKey}][${serialKey}][`
                      ) && value !== ""
                  )?.length
                }
                /
                {variationValue[`variation[${selectedKey}][${quantityKey}]`] ||
                  0}{" "}
                Entered
              </label>
            </div>
            <div className="add-scan">
              <input
                ref={inputRef}
                type="text"
                required
                className="form-control"
                placeholder="Enter/Scan"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" onClick={() => inputRef.current.focus()}>
                Add
              </button>
            </div>
            <div className="serial-number">
              {Object.entries(serialItems)?.filter(
                ([key, value]) =>
                  key.startsWith(`variation[${selectedKey}][${serialKey}][`) &&
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
                        `variation[${selectedKey}][${serialKey}][`
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
            //       key.startsWith(`variation[${selectedKey}][${serialKey}][`) &&
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
    </div>
  );
};

export default VariationSerialNumber;
