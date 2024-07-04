import React, { useRef } from "react";
import XIcon from "../../assets/images/icons/x-red.svg";
import Error from "../ui/Error/Error";

const ProductSerialNumber = ({
  error,
  quantity,
  serialItems,
  inputText,
  setInputText,
  handleRemove,
  handleItemSubmit,
  handleSerialSubmit,
  handleClearData,
  modalId,
}) => {
  const inputRef = useRef(null);

  return (
    <div
      className="modal fade modal-custom-design serial-item-modal"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Opening Stock - {quantity || 0}
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
                    {serialItems?.length ||
                      Object.keys(serialItems).length ||
                      0}
                    /{quantity || 0} Entered
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
                  <button
                    type="submit"
                    onClick={() => inputRef.current.focus()}
                  >
                    Add
                  </button>
                </div>
                <div className="serial-number">
                  {Object?.entries(serialItems)?.length === 0 ? (
                    <label className="col-form-label fw-medium mb-0">
                      No Serial Number Found!
                    </label>
                  ) : (
                    Object?.entries(serialItems)?.map(([key, value]) => (
                      <div
                        key={key}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <label className="col-form-label fw-medium mb-0">
                          {value}
                        </label>
                        <img
                          onClick={() => handleRemove(value)}
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
                onClick={handleClearData}
                className="btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn save-btn"
                // disabled={Object?.keys(serialItems)?.length === 0}
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

export default ProductSerialNumber;
