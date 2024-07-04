import React, { useEffect, useState } from "react";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAddBankMutation } from "../../../../redux/features/global/bank/bankApi";

const CreateBankModal = ({ dueModalOpen, setDueModalOpen }) => {
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

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
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
        holder: "",
        account: "",
        type: "",
      });
      // handlePopupModalClose();
      handleClearState();
      handleSuccessToast(addResponseData?.message?.message);
    }
  }, [addResponseError, addIsSuccess, addResponseData]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addBank(formValue);
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      holder: "",
      account: "",
      type: "",
    });
    setError("");
    setDueModalOpen({
      mainPageOpen: true,
      isInvoiceOpen: false,
      isBankOpen: false,
    });
  };

  return (
    <div className={`modal-content ${!dueModalOpen?.isBankOpen && "d-none"}`}>
      <div className="modal-header">
        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
          Add Bank
        </h1>
        <button
          type="button"
          className="btn-close"
          onClick={handleClearState}
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleAddSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label htmlFor="bank-name" className="col-form-label fw-medium">
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
            </div>
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
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
            </div>
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
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
            </div>
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
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

export default React.memo(CreateBankModal);
