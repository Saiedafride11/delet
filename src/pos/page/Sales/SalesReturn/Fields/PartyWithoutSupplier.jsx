import React from "react";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";

const PartyWithoutSupplier = ({ formValue }) => {
  return (
    <div className="custom-focus-label">
      <label className="bg-transparent">
        Party
        <small
          className={
            formValue?.party?.balance > 0 ? "text-green-lg" : "text-orange"
          }
        >
          (Balance: $
          {getNumberWithCommas(
            twoDigitFixed(Math.abs(formValue?.party?.balance))
          )}
          )
        </small>
      </label>
      <div className="input-wrapper pos-up-down-arrow">
        <div className="w-100">
          <input
            value={formValue?.party?.name || ""}
            disabled
            type="text"
            placeholder="Party name"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default PartyWithoutSupplier;
