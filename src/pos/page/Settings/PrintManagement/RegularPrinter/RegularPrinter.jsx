import React from "react";
import blankImage from "../../../../assets/images/icons/blank-grey.svg";
import A4Paper from "../../../../components/ui/Invoice/StaticUi/A4Paper";
import RegularPrinterFooter from "./component/RegularPrinterFooter";
import RegularPrinterStyle from "./component/RegularPrinterStyle";
import TotalAndTaxes from "./component/TotalAndTaxes";

const RegularPrinter = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="setting-regular-printer-pane"
      role="tabpanel"
      aria-labelledby="setting-regular-printer"
      tabIndex="0"
    >
      <div className="row">
        <div className="col-md-6">
          <div className="border mt-3 p-3 rounded-4">
            <RegularPrinterStyle />
            <div className="">
              <h6 className="pt-4 mb-4 fw-semibold">
                Print Company Info / Header
              </h6>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="make_regular_printer_default" />
                <label
                  className="settings-label"
                  htmlFor="make_regular_printer_default"
                >
                  Make Regular Printer Default
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="print_repeat_header_in_all_pages" />
                <label
                  className="settings-label"
                  htmlFor="print_repeat_header_in_all_pages"
                >
                  Print repeat header in all pages
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div>
              {/* <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="print_repeat_header_in_all_pages" />
                <label
                  className="settings-label"
                  htmlFor="print_repeat_header_in_all_pages"
                >
                  Business Name
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="print_repeat_header_in_all_pages" />
                <label
                  className="settings-label"
                  htmlFor="print_repeat_header_in_all_pages"
                >
                  Business Logo
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="print_repeat_header_in_all_pages" />
                <label
                  className="settings-label"
                  htmlFor="print_repeat_header_in_all_pages"
                >
                  Address
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="print_repeat_header_in_all_pages" />
                <label
                  className="settings-label"
                  htmlFor="print_repeat_header_in_all_pages"
                >
                  Email Address
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="print_repeat_header_in_all_pages" />
                <label
                  className="settings-label"
                  htmlFor="print_repeat_header_in_all_pages"
                >
                  Phone Number
                </label>
                <img src={blankImage} alt="icon" className="ms-1 w-16" />
              </div> */}
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" />
                <div className="custom-focus-label">
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    className="form-control ms-2"
                    placeholder="Acnoo"
                  />
                  <label htmlFor="business_name" className="left-15">
                    Business Name
                  </label>
                </div>
                <img src={blankImage} alt="icon" className="ms-3 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" id="business_logo" />
                <label className="settings-label" htmlFor="business_logo">
                  Business Logo <small className="text-sky">(Change)</small>
                </label>
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" />
                <div className="custom-focus-label w-94-percent">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control ms-2 w-100"
                    placeholder="Address"
                  />
                  <label htmlFor="address" className="left-15">
                    Address
                  </label>
                </div>
                <img src={blankImage} alt="icon" className="ms-3 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" />
                <div className="custom-focus-label w-94-percent">
                  <input
                    type="email"
                    id="email_address"
                    name="email_address"
                    className="form-control ms-2 w-100"
                    placeholder="Email Address"
                  />
                  <label htmlFor="email_address" className="left-15">
                    Email Address
                  </label>
                </div>
                <img src={blankImage} alt="icon" className="ms-3 w-16" />
              </div>
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" />
                <div className="custom-focus-label w-94-percent">
                  <input
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    className="form-control ms-2 w-100"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="phone_number" className="left-15">
                    Phone Number
                  </label>
                </div>
                <img src={blankImage} alt="icon" className="ms-3 w-16" />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p className="">Paper Size</p>
                <div className="d-flex align-items-center">
                  <div className="input-wrapper pos-up-down-arrow w-99">
                    <select className="form-control m-0" required="">
                      <option value="10">A4 Size</option>
                      <option value="10">A</option>
                      <option value="10">A</option>
                      <option value="10">A</option>
                    </select>
                    <span></span>
                  </div>
                  <img src={blankImage} alt="icon" className="ms-2 w-16" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p className="">Business Name Text Size</p>
                <div className="d-flex align-items-center">
                  <div className="input-wrapper pos-up-down-arrow w-99">
                    <select className="form-control m-0" required="">
                      <option value="10">Large</option>
                      <option value="10">A</option>
                      <option value="10">A</option>
                      <option value="10">A</option>
                    </select>
                    <span></span>
                  </div>
                  <img src={blankImage} alt="icon" className="ms-2 w-16" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p className="">Invoice Text Size</p>
                <div className="d-flex align-items-center">
                  <div className="input-wrapper pos-up-down-arrow w-99">
                    <select className="form-control m-0" required="">
                      <option value="10">Large</option>
                      <option value="10">A</option>
                      <option value="10">A</option>
                      <option value="10">A</option>
                    </select>
                    <span></span>
                  </div>
                  <img src={blankImage} alt="icon" className="ms-2 w-16" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p>Extra space on Top of PDF</p>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control ms-2 w-98"
                    placeholder="1"
                  />
                  <img src={blankImage} alt="icon" className="ms-2 w-16" />
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sky">Change Transaction Names</p>
              </div>
            </div>
            <div>
              <h6 className="pt-3 mb-3 fw-semibold">Item Table</h6>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p>Min No. of Rows in Item Table</p>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control ms-2 w-98"
                    placeholder="1"
                  />

                  <img src={blankImage} alt="icon" className="ms-2 w-16" />
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sky">Change Table Names</p>
              </div>
            </div>
            <TotalAndTaxes />
            <RegularPrinterFooter />
          </div>
        </div>

        <div className="col-md-6">
          <div className="border mt-3 p-3 rounded-4 overflow-auto">
            <A4Paper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularPrinter;
