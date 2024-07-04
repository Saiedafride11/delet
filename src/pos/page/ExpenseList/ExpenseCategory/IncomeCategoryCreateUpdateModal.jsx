import React, { useEffect, useState } from "react";

import { handlePopupModalClose } from "../../../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import {
  useAddIncomeExpenseCategoryMutation,
  useEditIncomeExpenseCategoryMutation,
} from "../../../redux/features/income_expense/income_expense_category/incomeExpenseCategoryApi";

const IncomeCategoryCreateUpdateModal = ({
  updateData,
  setUpdateData = () => {},
}) => {
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  const [
    addIncomeExpenseCategory,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddIncomeExpenseCategoryMutation();

  const [
    editIncomeExpenseCategory,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditIncomeExpenseCategoryMutation();

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    setFormValue(newFormValue);
  };

  useEffect(() => {
    if (updateData?.name !== undefined) {
      setFormValue({
        name: updateData?.name || "",
        description: updateData?.description || "",
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
        description: "",
      });
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addIncomeExpenseCategory({
      ...formValue,
      value: "Expense",
    });
  };

  // ----------------------------------------------
  // update Data
  // ----------------------------------------------

  useEffect(() => {
    if (editResponseError !== undefined) {
      handleResponseErrorMessage(editResponseError, setError);
    } else if (editIsSuccess) {
      handleClearState();
      handlePopupModalClose();
      // handleSuccessToast(editResponseData?.message?.message);
      handleSuccessToast("Date Updated Successfully");
    }
  }, [editResponseError, editIsSuccess, editResponseData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editIncomeExpenseCategory({
      id: updateData?.id,
      data: {
        ...formValue,
        value: "Expense",
      },
    });
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      description: "",
    });
    setError("");
    setUpdateData({});
  };

  return (
    <div
      className="modal fade modal-custom-design"
      id="expense-category-modal"
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
              {updateData?.name ? "Update Category" : "Add New Category"}
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
                <div className="col-md-12 mb-4">
                  <div className="custom-focus-label">
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      value={formValue?.name}
                      onChange={handleOnChange}
                    />
                    <label htmlFor="name" className="col-form-label fw-medium">
                      Name
                    </label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="custom-focus-label">
                    <textarea
                      type="text"
                      name="description"
                      className="form-control"
                      placeholder="Enter description"
                      value={formValue?.description}
                      onChange={handleOnChange}
                      rows="4"
                      cols="50"
                    ></textarea>
                    <label
                      htmlFor="description"
                      className="col-form-label fw-medium"
                    >
                      Description
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="button-group">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
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

export default React.memo(IncomeCategoryCreateUpdateModal);
