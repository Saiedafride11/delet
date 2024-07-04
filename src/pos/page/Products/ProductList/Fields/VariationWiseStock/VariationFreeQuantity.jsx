import React from "react";
import { Link } from "react-router-dom";
import listIcon from "../../../../../assets/images/icons/list.svg";
import VariationFreeSerialModal from "./VariationFreeSerialModal";

const VariationFreeQuantity = ({
  section,
  page,
  globalSettings,
  formValue,
  freeSerialItems,
  setFreeSerialItems,
  serialItems,
  variationValue,
  setVariationValue,
  selectedKey,
  setSelectedKey,
  handleOnChange,
}) => {
  return (
    <>
      {globalSettings?.item_stock?.free_quantity && (
        <div className="variation">
          {globalSettings?.variation?.serial_no ? (
            <>
              {page === "product_update" &&
              variationValue[`variation[${section?.id - 1}][warehouse_id]`] !==
                "" ? (
                <div className="custom-focus-label">
                  <label>Free Qty</label>
                  <div className="pos-up-down-arrow">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                      name={`variation[${section?.id - 1}][free_quantity]`}
                      readOnly={
                        page === "product_update" &&
                        variationValue[
                          `variation[${section?.id - 1}][warehouse_id]`
                        ] !== ""
                      }
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][free_quantity]`
                        ] <= 0
                          ? ""
                          : variationValue[
                              `variation[${section?.id - 1}][free_quantity]`
                            ]
                      }
                      onChange={(e) =>
                        handleOnChange(e, section?.id - 1, "free_quantity")
                      }
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="custom-focus-label">
                    <label>Free Qty</label>
                    {Object.entries(variationValue)?.filter(
                      ([key, value]) =>
                        key.startsWith(
                          `variation[${section?.id - 1}][serial_no][`
                        ) && value !== ""
                    )?.length > 0 ||
                    Object.entries(variationValue)?.filter(
                      ([key, value]) =>
                        key.startsWith(
                          `variation[${section?.id - 1}][free_serial_no][`
                        ) && value !== ""
                    )?.length > 0 ? (
                      <div
                        className="pos-up-down-arrow"
                        data-bs-toggle="modal"
                        data-bs-target="#variation-free-serial-modal"
                        onClick={() => setSelectedKey(section?.id - 1)}
                      >
                        <input
                          type="number"
                          className="form-control cursor-pointer"
                          placeholder="0"
                          readOnly
                          // readOnly={
                          //   Object.entries(variationValue)?.filter(
                          //     ([key, value]) =>
                          //       key.startsWith(
                          //         `variation[${
                          //           section?.id - 1
                          //         }][free_serial_no][`
                          //       ) && value !== ""
                          //   )?.length > 0
                          // }
                          name={`variation[${section?.id - 1}][free_quantity]`}
                          value={
                            variationValue[
                              `variation[${section?.id - 1}][free_quantity]`
                            ] <= 0
                              ? ""
                              : variationValue[
                                  `variation[${section?.id - 1}][free_quantity]`
                                ]
                          }
                          onChange={(e) =>
                            handleOnChange(e, section?.id - 1, "free_quantity")
                          }
                        />
                        {(page === "product_create" ||
                          (page === "product_update" &&
                            variationValue[
                              `variation[${section?.id - 1}][warehouse_id]`
                            ] === "")) && (
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#variation-free-serial-modal"
                            onClick={() => setSelectedKey(section?.id - 1)}
                          >
                            <img src={listIcon} alt="icon" />
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="pos-up-down-arrow">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="0"
                          name={`variation[${section?.id - 1}][free_quantity]`}
                          value={
                            variationValue[
                              `variation[${section?.id - 1}][free_quantity]`
                            ] <= 0
                              ? ""
                              : variationValue[
                                  `variation[${section?.id - 1}][free_quantity]`
                                ]
                          }
                          onChange={(e) =>
                            handleOnChange(e, section?.id - 1, "free_quantity")
                          }
                        />
                        {(page === "product_create" ||
                          (page === "product_update" &&
                            variationValue[
                              `variation[${section?.id - 1}][warehouse_id]`
                            ] === "")) && (
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#variation-free-serial-modal"
                            onClick={() => setSelectedKey(section?.id - 1)}
                          >
                            <img src={listIcon} alt="icon" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  <VariationFreeSerialModal
                    formValue={formValue}
                    freeSerialItems={freeSerialItems}
                    setFreeSerialItems={setFreeSerialItems}
                    serialItems={serialItems}
                    variationValue={variationValue}
                    setVariationValue={setVariationValue}
                    selectedKey={selectedKey}
                  />
                </>
              )}
            </>
          ) : (
            <div className="custom-focus-label">
              <label>Free Qty</label>
              <div className="pos-up-down-arrow">
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  name={`variation[${section?.id - 1}][free_quantity]`}
                  readOnly={
                    page === "product_update" &&
                    variationValue[
                      `variation[${section?.id - 1}][warehouse_id]`
                    ] !== ""
                  }
                  value={
                    variationValue[
                      `variation[${section?.id - 1}][free_quantity]`
                    ] <= 0
                      ? ""
                      : variationValue[
                          `variation[${section?.id - 1}][free_quantity]`
                        ]
                  }
                  onChange={(e) =>
                    handleOnChange(e, section?.id - 1, "free_quantity")
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VariationFreeQuantity;
