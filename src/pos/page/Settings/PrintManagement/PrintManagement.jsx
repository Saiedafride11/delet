import React from "react";
import { useSelector } from "react-redux";
import RegularPrinter from "./RegularPrinter/RegularPrinter";
import ThermalPrinter from "./ThermalPrinter/ThermalPrinter";

const PrintManagement = () => {
  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.invoice_print_settings
  );

  console.log("globalSettings", globalSettings);
  return (
    <div className="acnoo-dashboard-main-section">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header mb-3">
            <div className="title">
              <h4>Print</h4>
            </div>
          </div>
          <div className="setting-print-tabs mx-20">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="setting-regular-printer"
                  data-bs-toggle="tab"
                  data-bs-target="#setting-regular-printer-pane"
                  type="button"
                  role="tab"
                  aria-controls="setting-regular-printer-pane"
                  aria-selected="true"
                >
                  Regular Printer
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="setting-thermal-printer"
                  data-bs-toggle="tab"
                  data-bs-target="#setting-thermal-printer-pane"
                  type="button"
                  role="tab"
                  aria-controls="setting-thermal-printer-pane"
                  aria-selected="false"
                >
                  Thermal Printer
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <RegularPrinter />
              <ThermalPrinter />
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn save-btn w-120"
              // disabled={isLoading}
              // onClick={(e) => handleSubmit(formValue)}
            >
              {/* {isLoading ? <SpinnerBorderSm /> : "Update"} */}
              Update
            </button>
          </div>
          {/* {error !== "" && <Error message={error} />} */}
        </div>
      </div>
    </div>
  );
};

export default PrintManagement;
