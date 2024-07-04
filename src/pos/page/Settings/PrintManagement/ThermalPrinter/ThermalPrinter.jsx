import React from "react";
const ThermalPrinter = () => {
  return (
    <div
      className="tab-pane fade"
      id="setting-thermal-printer-pane"
      role="tabpanel"
      aria-labelledby="setting-thermal-printer"
      tabIndex="0"
    >
      <div className="row">
        <div className="col-md-6">
          <div className="setting-style">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="layout-style"
                  data-bs-toggle="tab"
                  data-bs-target="#layout-style-pane"
                  type="button"
                  role="tab"
                  aria-controls="layout-style-pane"
                  aria-selected="true"
                >
                  Layout Style
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="layout-style-pane"
                role="tabpanel"
                aria-labelledby="layout-style"
                tabIndex="0"
              >
                <div className="d-flex align-content-center gap-3 setting-layout-style p-3 border">
                  <div>
                    <div className="layout"></div>
                    <p className="text-center mt-1">Theme 1</p>
                  </div>
                  <div>
                    <div className="layout"></div>
                    <p className="text-center mt-1">Theme 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
              <div className="d-flex align-items-center">
                <input type="checkbox" />
                <p className="ms-2">Make Thermal Printer Default</p>
              </div>
              <p className="text-sky">Set default thermal printer</p>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="">Paper Size</p>
              <div className="input-wrapper pos-up-down-arrow w-150">
                <select className="form-control m-0" required="">
                  <option value="10">2 Inch - 58mm</option>
                  <option value="10">A</option>
                  <option value="10">A</option>
                  <option value="10">A</option>
                </select>
                <span></span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="">Text Size</p>
              <div className="input-wrapper pos-up-down-arrow w-150">
                <select className="form-control m-0" required="">
                  <option value="10">Regural Size</option>
                  <option value="10">A</option>
                  <option value="10">A</option>
                  <option value="10">A</option>
                </select>
                <span></span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
              <div className="d-flex align-items-center mb-3">
                <input type="checkbox" />
                <p className="ms-2">Printing Type</p>
              </div>
              <div className="input-wrapper pos-up-down-arrow w-150">
                <select className="form-control m-0" required="">
                  <option value="10">Text Printing</option>
                  <option value="10">A</option>
                  <option value="10">A</option>
                  <option value="10">A</option>
                </select>
                <span></span>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Use Text Styling(Bold)</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Auto Cut Paper After Printing</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Open Cash Drawer After Printing</p>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p>Extra lines at the end</p>
              <input
                type="text"
                className="form-control ms-2 w-99"
                placeholder="00"
              />
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p>Number of copies</p>
              <input
                type="text"
                className="form-control ms-2 w-99"
                placeholder="01"
              />
            </div>
          </div>
          <div>
            <h6 className="pt-3 pb-2 mb-3 border-bottom fw-semibold">
              Print Company Info / Header
            </h6>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <input
                type="text"
                className="form-control ms-2 w-300"
                placeholder="Company Name"
              />
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <input
                type="text"
                className="form-control ms-2"
                placeholder="Address"
              />
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <input
                type="text"
                className="form-control ms-2"
                placeholder="Email Address"
              />
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <input
                type="text"
                className="form-control ms-2"
                placeholder="Phone Number"
              />
            </div>
            <div className="mb-3">
              <p className="text-sky">Change Transaction Names</p>
            </div>
          </div>
          <div>
            <h6 className="pt-3 pb-2 mb-3 border-bottom fw-semibold">
              Totals & Taxes
            </h6>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Total Item Quantity</p>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <input type="checkbox" />
                <p className="ms-2">Amount with Decimal</p>
              </div>
              <input
                type="number"
                className="form-control w-99"
                name=""
                id=""
                placeholder="1"
              />
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Received Amount</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Balance Amount</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Current Balance of Party</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Tax Details</p>
            </div>
          </div>
          <div>
            <h6 className="pt-3 pb-2 mb-3 border-bottom fw-semibold">Footer</h6>
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" />
              <p className="ms-2">Print Description</p>
            </div>
            <div className="mb-3">
              <p className="text-sky">Terms and Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermalPrinter;
