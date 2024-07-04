import React from "react";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import useSingleDataCreateUpdate from "../../../../hooks/useSingleDataCreateUpdate";
import {
  useAddProductBrandMutation,
  useEditProductBrandMutation,
} from "../../../../redux/features/products/brand/productBrandApi";

const ProductBrandModal = ({ updateData, setUpdateData = () => {} }) => {
  const [
    addProductBrand,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddProductBrandMutation();

  const [
    editProductBrand,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditProductBrandMutation();

  const {
    handleAddSubmit,
    handleEditSubmit,
    handleClearState,
    error,
    name,
    setName,
  } = useSingleDataCreateUpdate(
    addProductBrand,
    addResponseData,
    addIsSuccess,
    addResponseError,
    editProductBrand,
    editResponseData,
    editIsSuccess,
    editResponseError,
    updateData,
    setUpdateData
  );
  return (
    <div
      className="modal fade modal-custom-design"
      id="product-brand-modal"
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
              {updateData?.name ? "Update Brand" : "Add New Brand"}
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
                  htmlFor="brand-name"
                  className="col-form-label fw-medium"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control"
                  id="brand-name"
                  placeholder="Enter brand name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="button-group">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    data-bs-dismiss="modal"
                    onClick={handleClearState}
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

export default React.memo(ProductBrandModal);
