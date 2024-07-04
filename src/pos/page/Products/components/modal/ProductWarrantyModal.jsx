import React from "react";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import useSingleDataCreateUpdate from "../../../../hooks/useSingleDataCreateUpdate";
import {
  useAddProductWarrantyMutation,
  useEditProductWarrantyMutation,
} from "../../../../redux/features/products/warranty/productWarrantyApi";

const ProductWarrantyModal = ({ updateData, setUpdateData = () => {} }) => {
  const [
    addProductWarranty,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddProductWarrantyMutation();

  const [
    editProductWarranty,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditProductWarrantyMutation();

  const {
    handleAddSubmit,
    handleEditSubmit,
    handleClearState,
    error,
    name,
    setName,
  } = useSingleDataCreateUpdate(
    addProductWarranty,
    addResponseData,
    addIsSuccess,
    addResponseError,
    editProductWarranty,
    editResponseData,
    editIsSuccess,
    editResponseError,
    updateData,
    setUpdateData
  );

  return (
    <div
      className="modal fade modal-custom-design"
      id="product-warranty-modal"
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
              {updateData?.name ? "Update Warranty" : "Add New Warranty"}
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
                  htmlFor="warranty-name"
                  className="col-form-label fw-medium"
                >
                  Warranty{" "}
                  <small className="text-secondary">(days, month, year)</small>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control"
                  id="warranty-name"
                  placeholder="Enter warranty"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default React.memo(ProductWarrantyModal);
