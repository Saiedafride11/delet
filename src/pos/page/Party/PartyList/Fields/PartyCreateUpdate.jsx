import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uploaderImage from "../../../../assets/images/icons/upload-icon.svg";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import AddReference from "./AddReference";

const PartyCreateUpdate = ({
  handleSubmit,
  handleOnChange,
  handleImageChange,
  handleRemoveImage,
  formValue,
  setFormValue,
  references,
  setReferences,
  allowFileUpload,
  isLoading,
  page,
}) => {
  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.party_settings
  );

  const navigate = useNavigate();

  // console.log("globalSettings", globalSettings);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row pt-2 custom-form-control">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="custom-focus-label mb-20">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter party name"
                  value={formValue?.name}
                  onChange={handleOnChange}
                />
                <label>Party Name*</label>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="custom-focus-label mb-20">
                <label>Party Type</label>
                <div className="input-wrapper pos-up-down-arrow">
                  <select
                    name="party_type"
                    className="form-control m-0"
                    value={formValue?.party_type}
                    onChange={handleOnChange}
                  >
                    <option className="d-none">Select Party</option>
                    <option value="1">Supplier</option>
                    <option value="2">Dealer</option>
                    <option value="3">Retailer</option>
                    <option value="4">Wholesaler</option>
                  </select>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="custom-focus-label mb-20">
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formValue?.phone}
                  onChange={handleOnChange}
                />
                <label>Phone Number*</label>
              </div>
            </div>

            {globalSettings?.address?.email && (
              <div className="col-md-6 mb-2">
                <div className="custom-focus-label mb-20">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formValue?.email}
                    onChange={handleOnChange}
                  />
                  <label>Email</label>
                </div>
              </div>
            )}
          </div>
        </div>

        {globalSettings?.address?.nid_passport && (
          <div className="col-md-4 mb-2">
            <div className="position-relative">
              <label className="upload-img-top-label">Party NID/ Image</label>
              <div className="upload-img-v2">
                <label className="upload-v4">
                  <div className="img-wrp">
                    <div className="position-relative">
                      <img
                        src={formValue?.nid_passport_image || uploaderImage}
                        alt="user"
                      />
                      {formValue?.nid_passport_image !== null && (
                        <span
                          onClick={handleRemoveImage}
                          className="w-h-lh-18 position-absolute top-0 end-0 bg-red text-white px-1 rounded-circle"
                        >
                          ⨯
                        </span>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg, image/jpg, image/png"
                    className="d-none"
                    disabled={allowFileUpload === true ? false : true}
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
        {globalSettings?.address?.address && (
          <div className="col-md-6">
            <div className="custom-focus-label mb-20">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter address"
                value={formValue?.address}
                onChange={handleOnChange}
              />
              <label>Address</label>
            </div>
          </div>
        )}
        {globalSettings?.balance?.credit_limit && (
          <div className="col-md-6">
            <div className="custom-focus-label mb-20">
              <input
                type="number"
                name="credit_limit"
                className="form-control"
                placeholder="Enter credit limit"
                value={formValue?.credit_limit < 0 ? 0 : formValue.credit_limit}
                onChange={handleOnChange}
              />
              <label>Credit Limit </label>
            </div>
          </div>
        )}
        <h4 className="mb-3">Balance</h4>
        <div className="col-md-6">
          <div className="custom-focus-label mb-20">
            <input
              type="number"
              name="opening_balance"
              disabled={
                (page === "party_update" &&
                  formValue?.party_type == 1 &&
                  formValue?.purchase?.length > 0) ||
                (page === "party_update" &&
                  formValue?.party_type != 1 &&
                  formValue?.sales?.length > 0)
              }
              className="form-control"
              placeholder="Enter opening balance"
              value={
                formValue?.opening_balance < 0 ? 0 : formValue.opening_balance
              }
              onChange={handleOnChange}
            />
            {(page === "party_update" &&
              formValue?.party_type == 1 &&
              formValue?.purchase?.length > 0) ||
            (page === "party_update" &&
              formValue?.party_type != 1 &&
              formValue?.sales?.length > 0) ? (
              <label className="bg-transparent">Opening Balance*</label>
            ) : (
              <label>Opening Balance*</label>
            )}
          </div>
        </div>
        {globalSettings?.balance?.date && (
          <div className="col-md-6">
            <div className="custom-focus-label mb-20">
              <input
                type="date"
                name="date"
                className="form-control"
                value={formValue?.date}
                onChange={handleOnChange}
              />
              <label>As of Date</label>
            </div>
          </div>
        )}
        <div className="d-flex align-items-center gap-3 mb-2">
          <div className="d-flex align-items-center gap-2">
             
            <input
              type="radio"
              id="advance"
              name="opening_balance_type"
              className="cursor-pointer"
              value="Advance"
              checked={formValue?.opening_balance_type === "Advance"}
              onChange={handleOnChange}
            />
             
            <label htmlFor="advance" className="cursor-pointer m-0">
              Advance Balance
            </label>
          </div>
          <div className="d-flex align-items-center gap-2">
             
            <input
              type="radio"
              id="due"
              name="opening_balance_type"
              className="cursor-pointer"
              value="Due"
              checked={formValue?.opening_balance_type === "Due"}
              onChange={handleOnChange}
            />
             
            <label htmlFor="due" className="cursor-pointer m-0">
              Due Balance
            </label>
          </div>
        </div>
        {globalSettings?.reference?.reference && (
          <AddReference
            setFormValue={setFormValue}
            references={references}
            setReferences={setReferences}
          />
        )}
        <div className="d-flex align-items-center justify-content-center mt-3">
          <div className="button-group">
            <button
              onClick={() => navigate("/party")}
              className="btn cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="btn save-btn" disabled={isLoading}>
              {isLoading ? <SpinnerBorderSm /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PartyCreateUpdate;
