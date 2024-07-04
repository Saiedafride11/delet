import React from "react";
import blankImage from "../../../../assets/images/icons/blank-grey.svg";

import { useGetCurrenciesQuery } from "../../../../redux/features/global/currencies/currenciesApi";
import InvoicePrefix from "./InvoicePrefix";
import useSettingProductsManageOnChange from "./useSettingProductsManageOnChange";

const Application = ({
  settingsApplication,
  setFormValue,
  settingsInvoice,
  setPrefixValue,
}) => {
  const { data: currencies, isLoading, isError } = useGetCurrenciesQuery();
  const initialData = currencies?.data?.currencies;

  const { handleOnChange } = useSettingProductsManageOnChange(
    setFormValue,
    "application"
  );

  return (
    <>
      <div className="mb-4">
        <h6 className="pt-3 pb-4 fw-semibold fw-semibold">Application</h6>

        <div className="d-flex align-items-center">
          <div className="form-check form-switch setting-switch min-h-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="online_sale"
              name="online_sale"
              checked={settingsApplication?.online_sale || false}
              onChange={handleOnChange}
            />
          </div>
          <label className="settings-label" htmlFor="online_sale">
            Online Sale
          </label>
          <img src={blankImage} alt="icon" className="ms-2" />
        </div>

        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <p>Currency</p>
            <img src={blankImage} alt="icon" />
          </div>
          <div className="input-wrapper pos-up-down-arrow w-115">
            <select
              name="currency"
              value={settingsApplication?.currency}
              onChange={handleOnChange}
              className="form-control m-0 pt-2"
            >
              <option className="d-none text-gray-sm">Currency</option>
              {initialData?.length === 0 ||
              initialData === undefined ||
              isLoading ||
              isError ? (
                <option>No data found!</option>
              ) : (
                initialData
                  ?.slice()
                  ?.reverse()
                  .map((item) => (
                    <option key={item?.iso_code} value={item?.iso_code}>
                      {item?.iso_code}
                    </option>
                  ))
              )}
            </select>
            <span></span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="custom-checkbox-bg"
              id="backup"
              name="backup"
              checked={settingsApplication?.backup || false}
              onChange={handleOnChange}
            />
            <label className="settings-label" htmlFor="backup">
              Backup
            </label>
            <img src={blankImage} alt="icon" className="ms-2" />
          </div>
          <div className="input-wrapper pos-up-down-arrow w-115">
            <select
              name="backup_duration"
              value={settingsApplication?.backup_duration}
              onChange={handleOnChange}
              className="form-control m-0 pt-2"
              required=""
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <span></span>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3">
          <input
            type="checkbox"
            className="custom-checkbox-bg"
            id="tin_number"
            name="tin_number"
            checked={settingsApplication?.tin_number || false}
            onChange={handleOnChange}
          />
          <label className="settings-label" htmlFor="tin_number">
            TIN Number
          </label>
          <img src={blankImage} alt="icon" className="ms-2" />
        </div>
      </div>

      <InvoicePrefix
        settings={settingsInvoice}
        setPrefixValue={setPrefixValue}
      />
    </>
  );
};

export default Application;
