import React from "react";

const RegularPrinterStyle = () => {
  return (
    <div className="setting-style">
      <ul className="nav nav-tabs mt-0" id="myTab" role="tablist">
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
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="color-style"
            data-bs-toggle="tab"
            data-bs-target="#color-style-pane"
            type="button"
            role="tab"
            aria-controls="color-style-pane"
            aria-selected="false"
          >
            Color Style
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
        <div
          className="tab-pane fade"
          id="color-style-pane"
          role="tabpanel"
          aria-labelledby="color-style"
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
            <div>
              <div className="layout"></div>
              <p className="text-center mt-1">Theme 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularPrinterStyle;
