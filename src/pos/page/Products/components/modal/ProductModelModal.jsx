import React, { useEffect, useState } from "react";
import SelectOption from "../../../../components/common/SelectOption";
import { handlePopupModalClose } from "../../../../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useGetProductBrandQuery } from "../../../../redux/features/products/brand/productBrandApi";
import {
  useAddProductModelMutation,
  useEditProductModelMutation,
} from "../../../../redux/features/products/model/productModelApi";

const ProductModelModal = ({ updateData, setUpdateData = () => {} }) => {
  const [formValue, setFormValue] = useState({
    brand_id: "",
    name: "",
  });

  const [error, setError] = useState("");

  const {
    data: productBrand,
    isLoading: brandIsLoading,
    isError: brandIsError,
  } = useGetProductBrandQuery();

  const [
    addProductModel,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddProductModelMutation();

  const [
    editProductModel,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditProductModelMutation();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

  useEffect(() => {
    if (updateData?.name !== undefined) {
      setFormValue({ brand_id: updateData?.brand_id, name: updateData?.name });
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
        brand_id: "",
        name: "",
      });
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProductModel({
      brand_id: formValue?.brand_id,
      name: formValue?.name,
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
        brand_id: "",
        name: "",
      });
      setError("");
      setUpdateData({});
      handlePopupModalClose();
      handleSuccessToast(editResponseData?.message?.message);
    }
  }, [editResponseError, editIsSuccess, editResponseData, setUpdateData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editProductModel({
      id: updateData?.id,
      data: {
        brand_id: formValue?.brand_id,
        name: formValue?.name,
      },
    });
  };

  const handleClearState = () => {
    setFormValue({
      brand_id: "",
      name: "",
    });
    setError("");
    setUpdateData({});
  };

  return (
    <div
      className="modal fade modal-custom-design"
      id="product-model-modal"
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
              {updateData?.name ? "Update Model" : "Add New Model"}
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
                  htmlFor="category-name"
                  className="col-form-label fw-medium"
                >
                  Brand Name
                </label>
                <div className="input-wrapper pos-up-down-arrow">
                  <SelectOption
                    name="brand_id"
                    value={formValue?.brand_id}
                    handleOnChange={handleOnChange}
                    title="Brand Name"
                    items={productBrand?.data?.brand}
                    isLoading={brandIsLoading}
                    isError={brandIsError}
                  />
                  <span></span>
                </div>
              </div>
              <div className="custom-focus-label mb-3">
                <label
                  htmlFor="model-name"
                  className="col-form-label fw-medium"
                >
                  Model Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="model-name"
                  placeholder="Enter model"
                  value={formValue?.name}
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

export default React.memo(ProductModelModal);
