import React, { useEffect, useState } from "react";
import { handlePopupModalClose } from "../../../../components/function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAddPartyMutation } from "../../../../redux/features/party/party/partyApi";

const PartyAddModal = ({ setSearchText }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    opening_balance: "",
    opening_balance_type: "Advance",
  });
  const [error, setError] = useState("");

  const [
    addParty,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useAddPartyMutation();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setSearchText("");
      setError("");
      setFormValue({
        name: "",
        phone: "",
        email: "",
        address: "",
        opening_balance: "",
        opening_balance_type: "Advance",
      });
      handlePopupModalClose();
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addParty({
      ...formValue,
      party_type: 1,
      credit_limit: "",
      nid_passport_image: null,
      date: new Date().toLocaleDateString("en-GB"),
      reference: [],
    });
  };

  const handleClearState = () => {
    setFormValue({
      name: "",
      phone: "",
      email: "",
      address: "",
      opening_balance: "",
      opening_balance_type: "Advance",
    });
    setError("");
  };

  return (
    <div
      className="modal fade modal-custom-design"
      id="party-add-modal"
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
              Add New Party
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control p-10"
                      placeholder="Enter party name"
                      value={formValue?.name}
                      onChange={handleOnChange}
                    />
                    <label>Party Name*</label>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <input
                      readOnly
                      className="form-control p-10"
                      value="Supplier"
                    />
                    <label>Party type</label>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <input
                      type="number"
                      name="phone"
                      required
                      className="form-control p-10"
                      placeholder="Enter phone number"
                      value={formValue?.phone}
                      onChange={handleOnChange}
                    />
                    <label>Phone Number*</label>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <input
                      type="email"
                      name="email"
                      className="form-control p-10"
                      placeholder="Enter email"
                      value={formValue?.email}
                      onChange={handleOnChange}
                    />
                    <label>Email</label>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <div className="custom-focus-label mb-20">
                    <input
                      type="text"
                      name="address"
                      className="form-control p-10"
                      placeholder="Enter address"
                      value={formValue?.address}
                      onChange={handleOnChange}
                    />
                    <label>Address</label>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <input
                      type="number"
                      name="opening_balance"
                      required
                      className="form-control p-10"
                      placeholder="Enter opening balance"
                      value={formValue?.opening_balance}
                      onChange={handleOnChange}
                    />
                    <label>Opening Balance*</label>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <label>Due Type</label>
                    <div className="input-wrapper pos-up-down-arrow">
                      <select
                        required
                        name="opening_balance_type"
                        className="form-control m-0 p-10"
                        value={formValue?.opening_balance_type}
                        onChange={handleOnChange}
                      >
                        <option className="d-none">Select type</option>
                        <option value="Advance">Advance</option>
                        <option value="Due">Due</option>
                      </select>
                      <span></span>
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
                      disabled={isLoading}
                      className="btn save-btn"
                    >
                      {isLoading ? <SpinnerBorderSm /> : "Save"}
                    </button>
                  </div>
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

export default React.memo(PartyAddModal);
