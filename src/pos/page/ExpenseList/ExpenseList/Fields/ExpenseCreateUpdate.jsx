import React, { useEffect, useState } from "react";
import { customISODate } from "../../../../components/function/customISODate";
import { handlePopupModalClose } from "../../../../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import {
  useAddExpenseMutation,
  useEditExpenseMutation,
} from "../../../../redux/features/income_expense/expense/expenseApi";
import ExpenseCategory from "./ExpenseCategory";

const ExpenseCreateUpdate = ({
  updateData,
  setUpdateData,
  isCategoryOpen,
  setIsCategoryOpen,
}) => {
  const [formValue, setFormValue] = useState({
    expense_date: customISODate(),
    income_expense_category_id: "",
    sector: "",
    payment_type: "Cash",
    amount: 0,
    note: "",
  });
  const [error, setError] = useState("");

  const [
    addExpense,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddExpenseMutation();

  const [
    editExpense,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditExpenseMutation();

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    if (fieldName === "amount") {
      if (parseFloat(fieldValue) < 1 || fieldValue === "") {
        setFormValue((prev) => ({
          ...prev,
          amount: 0,
        }));
      } else {
        setFormValue((prev) => ({
          ...prev,
          amount: parseFloat(fieldValue),
        }));
      }
    } else {
      setFormValue(newFormValue);
    }
  };

  useEffect(() => {
    if (updateData?.sector !== undefined) {
      setFormValue({
        expense_date: updateData?.expense_date?.split(" ")[0] || "",
        income_expense_category_id:
          updateData?.income_expense_category_id || "",
        sector: updateData?.sector || "",
        payment_type: updateData?.payment_type || "",
        amount: updateData?.amount || "",
        note: updateData?.note || "",
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
      handleClearState();
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (formValue?.income_expense_category_id === "") {
      setError("The income expense category id field is required.");
    } else {
      addExpense({
        ...formValue,
        expense_date: new Date(formValue?.expense_date).toLocaleDateString(
          "en-GB"
        ),
      });
    }
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
      handleSuccessToast(editResponseData?.message?.message);
    }
  }, [editResponseError, editIsSuccess, editResponseData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (formValue?.income_expense_category_id === "") {
      setError("The income expense category id field is required.");
    } else {
      editExpense({
        id: updateData?.id,
        data: {
          ...formValue,
          expense_date: new Date(formValue?.expense_date).toLocaleDateString(
            "en-GB"
          ),
        },
      });
    }
  };

  const handleClearState = () => {
    setFormValue({
      expense_date: customISODate(),
      income_expense_category_id: "",
      sector: "",
      payment_type: "Cash",
      amount: 0,
      note: "",
    });
    setError("");
    setUpdateData({});
    setIsCategoryOpen(false);
  };

  return (
    <div className={`modal-content ${isCategoryOpen && "d-none"}`}>
      <div className="modal-header">
        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
          {updateData?.sector ? "Update Expense" : "Add New Expense"}
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
          onSubmit={updateData?.sector ? handleEditSubmit : handleAddSubmit}
        >
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="custom-focus-label">
                <label
                  htmlFor="expense_date"
                  className="col-form-label fw-medium"
                >
                  Date
                </label>
                <input
                  type="date"
                  required
                  name="expense_date"
                  className="form-control"
                  value={formValue?.expense_date}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="custom-focus-label">
                <input
                  type="text"
                  name="sector"
                  required
                  className="form-control"
                  id="sector"
                  placeholder="Enter name"
                  value={formValue?.sector}
                  onChange={handleOnChange}
                />
                <label htmlFor="sector" className="col-form-label fw-medium">
                  Name
                </label>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <ExpenseCategory
                initialKey="income_expense_category_id"
                initialValue={formValue?.income_expense_category_id}
                setFormValue={setFormValue}
                setIsCategoryOpen={setIsCategoryOpen}
              />
            </div>
            <div className="col-md-6 mb-4">
              <div className="custom-focus-label">
                <label
                  htmlFor="payment_type"
                  className="col-form-label fw-medium"
                >
                  Payment Type
                </label>
                <select
                  name="payment_type"
                  value={formValue?.payment_type}
                  onChange={handleOnChange}
                  className="form-control m-0"
                  required
                >
                  <option className="d-none">Select Payment Type</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="custom-focus-label">
                <label htmlFor="amount" className="col-form-label fw-medium">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  required
                  className="form-control"
                  id="amount"
                  placeholder="Ex:100"
                  value={formValue?.amount <= 0 ? "" : formValue.amount}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="custom-focus-label">
                <textarea
                  type="text"
                  name="note"
                  className="form-control"
                  placeholder="Enter note"
                  value={formValue?.note}
                  onChange={handleOnChange}
                  rows="1"
                  cols="50"
                ></textarea>
                <label htmlFor="note" className="col-form-label fw-medium">
                  Note
                </label>
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
                {addIsLoading || editIsLoading ? <SpinnerBorderSm /> : "Save"}
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

export default ExpenseCreateUpdate;
