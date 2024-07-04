import React, { useEffect, useState } from "react";
import {
  useAddWarehouseMutation,
  useEditWarehouseMutation,
} from "../../../redux/features/warehouse/warehouseApi";
import { handlePopupModalClose } from "../../function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../function/handleResponseErrorMessage";
import Error from "../../ui/Error/Error";
import SpinnerBorderSm from "../../ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../ui/Toast/handleSuccessToast";

const ProductWarehouseModal = ({ updateData, setUpdateData = () => {} }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip_code: "",
  });
  const [error, setError] = useState("");

  const [
    addWarehouse,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddWarehouseMutation();

  const [
    editWarehouse,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditWarehouseMutation();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

  useEffect(() => {
    if (updateData?.name !== undefined) {
      setFormValue({
        name: updateData?.name || "",
        phone: updateData?.phone || "",
        email: updateData?.email || "",
        address: updateData?.address || "",
        city: updateData?.city || "",
        zip_code: updateData?.zip_code || "",
      });
    }
  }, [updateData]);

  // ----------------------------------------------
  // add Data
  // ----------------------------------------------
  useEffect(() => {
    if (addResponseError !== undefined) {
      handleResponseErrorMessage(addResponseError, setError);
    } else if (addIsSuccess) {
      setError("");
      setFormValue({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zip_code: "",
      });
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addWarehouse({
      name: formValue?.name,
      phone: formValue?.phone,
      email: formValue?.email,
      address: formValue?.address,
      city: formValue?.city,
      zip_code: formValue?.zip_code,
    });
  };

  // ----------------------------------------------
  // update Data
  // ----------------------------------------------

  useEffect(() => {
    if (editResponseError !== undefined) {
      handleResponseErrorMessage(editResponseError, setError);
    } else if (editIsSuccess) {
      setFormValue({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zip_code: "",
      });
      setError("");
      setUpdateData({});
      handlePopupModalClose();
      handleSuccessToast(editResponseData?.message?.message);
    }
  }, [editResponseError, editIsSuccess, editResponseData, setUpdateData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editWarehouse({
      id: updateData?.id,
      data: {
        name: formValue?.name,
        phone: formValue?.phone,
        email: formValue?.email,
        address: formValue?.address,
        city: formValue?.city,
        zip_code: formValue?.zip_code,
      },
    });
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zip_code: "",
    });
    setError("");
    setUpdateData({});
  };

  return (
    <div
      className="modal fade modal-custom-design"
      id="product-warehouse-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              {updateData?.name ? "Update Warehouse" : "Add New Warehouse"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClearState}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={updateData?.name ? handleEditSubmit : handleAddSubmit}
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label
                      htmlFor="warehouse-name"
                      className="col-form-label fw-medium"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control"
                      id="warehouse-name"
                      placeholder="Enter name"
                      value={formValue?.name}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label
                      htmlFor="warehouse-number"
                      className="col-form-label fw-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      id="warehouse-number"
                      placeholder="Enter phone number"
                      value={formValue?.phone}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label
                      htmlFor="warehouse-email"
                      className="col-form-label fw-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="warehouse-email"
                      placeholder="Enter email address"
                      value={formValue?.email}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label
                      htmlFor="warehouse-state"
                      className="col-form-label fw-medium"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      id="warehouse-state"
                      placeholder="Enter State"
                      value={formValue?.address}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label
                      htmlFor="warehouse-city"
                      className="col-form-label fw-medium"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      id="warehouse-city"
                      placeholder="Enter city"
                      value={formValue?.city}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label
                      htmlFor="warehouse-zip-code"
                      className="col-form-label fw-medium"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zip_code"
                      className="form-control"
                      id="warehouse-zip-code"
                      placeholder="Enter zip code"
                      value={formValue?.zip_code}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="button-group">
                  <button
                    type="button"
                    onClick={handleClearState}
                    className="btn cancel-btn"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addIsLoading || editIsLoading}
                    className="btn save-btn"
                  >
                    {addIsLoading || editIsLoading ? (
                      <SpinnerBorderSm />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="px-3 pb-2">
            {error !== "" && <Error message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductWarehouseModal);
