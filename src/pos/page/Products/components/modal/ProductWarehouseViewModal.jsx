import React from "react";

const ProductWarehouseViewModal = ({ updateData }) => {
  return (
    <div
      className="modal fade modal-custom-design"
      id="pos-view-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              View Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="view-description">
              <ul>
                <li>
                  <span>Name</span> <span>:</span>
                  <strong>{updateData?.name || "----"}</strong>
                </li>
                <li>
                  <span>Phone Number </span> <span>:</span>
                  <strong>{updateData?.phone || "----"}</strong>
                </li>
                <li>
                  <span>Email Address</span> <span>:</span>
                  <strong>{updateData?.email || "----"}</strong>
                </li>
                <li>
                  <span>Address</span> <span>:</span>
                  <strong>{updateData?.address || "----"}</strong>
                </li>
                <li>
                  <span>City</span> <span>:</span>
                  <strong>{updateData?.city || "----"}</strong>
                </li>
                <li>
                  <span>Zip Code</span> <span>:</span>
                  <strong>{updateData?.zip_code || "----"}</strong>
                </li>
                <li>
                  <span>Product</span> <span>:</span>
                  <strong>-----</strong>
                </li>
                <li>
                  <span>Status</span> <span>:</span>
                  <strong className="text-green">Active</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductWarehouseViewModal);
