import React, { useEffect, useState } from "react";
import { handlePopupModalClose } from "../../../../../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../../components/ui/Toast/handleSuccessToast";
import {
  useAddProductColorMutation,
  useEditProductColorMutation,
} from "../../../../../redux/features/products/variation/color/productColorApi";

const ProductColorModal = ({ updateData, setUpdateData = () => {} }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    hex_code: "",
  });
  const [error, setError] = useState("");

  const [
    addProductColor,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddProductColorMutation();

  const [
    editProductColor,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditProductColorMutation();

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
        hex_code: updateData?.hex_code?.replace(/#/g, "") || "",
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
      setFormValue({
        name: "",
        hex_code: "",
      });
      setError("");
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProductColor({
      name: formValue?.name,
      hex_code: formValue?.hex_code === "" ? "" : "#" + formValue?.hex_code,
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
        hex_code: "",
      });
      setError("");
      setUpdateData({});
      handlePopupModalClose();
      handleSuccessToast(editResponseData?.message?.message);
    }
  }, [editResponseError, editIsSuccess, editResponseData, setUpdateData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editProductColor({
      id: updateData?.id,
      data: {
        name: formValue?.name,
        hex_code: formValue?.hex_code === "" ? "" : "#" + formValue?.hex_code,
      },
    });
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      hex_code: "",
    });
    setError("");
    setUpdateData({});
  };

  return (
    <div
      className="modal fade modal-custom-design"
      id="product-color-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              {updateData?.name ? "Update Color" : "Add New Color"}
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
              <div className="custom-focus-label mb-3">
                <label
                  htmlFor="color-name"
                  className="col-form-label fw-medium"
                >
                  Color Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control"
                  id="color-name"
                  placeholder="Enter color name"
                  value={formValue?.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="custom-focus-label mb-3">
                <label htmlFor="hex_code" className="col-form-label fw-medium">
                  Hex Code
                </label>
                <input
                  type="text"
                  name="hex_code"
                  className="form-control"
                  id="hex_code"
                  placeholder="Enter hex code"
                  value={formValue?.hex_code}
                  onChange={handleOnChange}
                />
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

export default React.memo(ProductColorModal);
