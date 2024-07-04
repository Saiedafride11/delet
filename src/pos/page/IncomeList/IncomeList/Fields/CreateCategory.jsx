import React, { useEffect, useState } from "react";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAddIncomeExpenseCategoryMutation } from "../../../../redux/features/income_expense/income_expense_category/incomeExpenseCategoryApi";

const CreateCategory = ({ isCategoryOpen, setIsCategoryOpen }) => {
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

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    setFormValue(newFormValue);
  };

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
      handleClearState();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncomeExpenseCategory({
      ...formValue,
      value: "Income",
    });
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      description: "",
    });
    setError("");
    setIsCategoryOpen(false);
  };

  return (
    <div className={`modal-content ${!isCategoryOpen && "d-none"}`}>
      <div className="modal-header">
        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
          Add New Category
        </h1>
        <button
          type="button"
          className="btn-close"
          onClick={handleClearState}
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
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
                onClick={handleClearState}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addIsLoading}
                className="btn save-btn"
              >
                {addIsLoading ? <SpinnerBorderSm /> : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="px-3 pb-2">
        {error !== "" && <Error message={error} />}
      </div>
    </div>
  );
};

export default CreateCategory;
