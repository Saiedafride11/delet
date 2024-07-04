import React from "react";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";

const WarehouseListViewModal = ({ updateData, currencySymbol }) => {
  // console.log("updateData", updateData);

  return (
    <div
      className="modal fade modal-custom-design"
      id="warehouse-view-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`modal-dialog modal-dialog-centered ${
          updateData?.product_type === "Variation" ? "modal-lg" : "modal-lg-600"
        }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              Warehouse Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="view-description product">
              <ul>
                <li>
                  <span>Name</span> <span>:</span>
                  <strong>{updateData?.name || "N/A"}</strong>
                </li>
                <li>
                  <span>Phone Number</span> <span>:</span>
                  <strong>{updateData?.phone || "N/A"}</strong>
                </li>
                <li>
                  <span>Email Address</span> <span>:</span>
                  <strong>{updateData?.email || "N/A"}</strong>
                </li>
                <li>
                  <span>Address</span> <span>:</span>
                  <strong>{updateData?.address || "N/A"}</strong>
                </li>
                <li>
                  <span>City Name</span> <span>:</span>
                  <strong>{updateData?.city || "N/A"}</strong>
                </li>
                <li>
                  <span>Zip Code</span> <span>:</span>
                  <strong>{updateData?.zip_code || "N/A"}</strong>
                </li>
                <li>
                  <span>Total Product</span> <span>:</span>
                  <strong>
                    {getNumberWithCommas(
                      twoDigitFixed(updateData?.total_product)
                    )}{" "}
                    (Free
                    {getNumberWithCommas(
                      twoDigitFixed(updateData?.total_free_product)
                    )}
                    )
                  </strong>
                </li>
                <li>
                  <span>Stock value</span> <span>:</span>
                  <strong>
                    {currencySymbol +
                      getNumberWithCommas(
                        twoDigitFixed(updateData?.purchase_product_value)
                      )}
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WarehouseListViewModal);
