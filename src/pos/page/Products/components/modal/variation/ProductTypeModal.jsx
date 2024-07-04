import React from "react";
import Error from "../../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../../components/ui/Spinner/spinnerBorderSm";
import useSingleDataCreateUpdate from "../../../../../hooks/useSingleDataCreateUpdate";
import {
  useAddProductTypeMutation,
  useEditProductTypeMutation,
} from "../../../../../redux/features/products/variation/type/productTypeApi";

const ProductTypeModal = ({ updateData, setUpdateData = () => {} }) => {
  const [
    addProductType,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddProductTypeMutation();

  const [
    editProductType,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditProductTypeMutation();

  const {
    handleAddSubmit,
    handleEditSubmit,
    handleClearState,
    error,
    name,
    setName,
  } = useSingleDataCreateUpdate(
    addProductType,
    addResponseData,
    addIsSuccess,
    addResponseError,
    editProductType,
    editResponseData,
    editIsSuccess,
    editResponseError,
    updateData,
    setUpdateData
  );
  return (
    <div
      className="modal fade modal-custom-design"
      id="product-type-modal"
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
              {updateData?.name ? "Update Type" : "Add New Type"}
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
                <label htmlFor="type-name" className="col-form-label fw-medium">
                  Type Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control"
                  id="type-name"
                  placeholder="Enter type name"
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

export default React.memo(ProductTypeModal);
