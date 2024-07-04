import React, { useEffect, useState } from "react";

import {
  useAddBankMutation,
  useEditBankMutation,
} from "../../redux/features/global/bank/bankApi";
import { handlePopupModalClose } from "../function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../function/handleResponseErrorMessage";
import Error from "../ui/Error/Error";
import SpinnerBorderSm from "../ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../ui/Toast/handleSuccessToast";

const CreateBankModal = ({ updateData, setUpdateData = () => {} }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    holder: "",
    account: "",
    type: "",
  });
  const [error, setError] = useState("");

  const [
    addBank,
    {
      data: addResponseData,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addResponseError,
    },
  ] = useAddBankMutation();

  const [
    editBank,
    {
      data: editResponseData,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      error: editResponseError,
    },
  ] = useEditBankMutation();

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
        holder: "",
        account: "",
        type: "",
      });
      handlePopupModalClose();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addBank(formValue);
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
        holder: "",
        account: "",
        type: "",
      });
      setError("");
      setUpdateData({});
      handlePopupModalClose();
      handleSuccessToast(editResponseData?.message?.message);
    }
  }, [editResponseError, editIsSuccess, editResponseData, setUpdateData]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editBank({
      id: updateData?.id,
      data: {
        name: formValue?.name,
        holder: formValue?.holder,
        account: formValue?.account,
      },
    });
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      holder: "",
      account: "",
      type: "",
    });
    setError("");
    setUpdateData({});
  };

  return (
    <div
      className="modal fade modal-custom-design"
      id="bank-modal"
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
              {updateData?.name ? "Update Bank" : "Add Bank"}
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
                  <label
                    htmlFor="bank-name"
                    className="col-form-label fw-medium"
                  >
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    id="bank-name"
                    placeholder="Enter name"
                    value={formValue?.name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="holder" className="col-form-label fw-medium">
                    Holder Name
                  </label>
                  <input
                    type="text"
                    name="holder"
                    className="form-control"
                    id="holder"
                    placeholder="Enter holder"
                    value={formValue?.holder}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="account-no"
                    className="col-form-label fw-medium"
                  >
                    Account no.
                  </label>
                  <input
                    type="number"
                    name="account"
                    className="form-control"
                    id="account-no"
                    placeholder="Enter account no"
                    value={formValue?.account}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="col-form-label fw-medium">Bank Type</label>
                  <select
                    name="type"
                    value={formValue?.type}
                    onChange={handleOnChange}
                    className="form-control"
                  >
                    <option className="d-none">Select bank</option>
                    <option value="Bank">Bank</option>
                    <option value="Mobile Banking">Mobile Banking</option>
                  </select>
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

export default React.memo(CreateBankModal);
