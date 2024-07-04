import React from "react";
import privacyImage from "../../assets/images/icons/privacy-mode.svg";

const PrivacyModeModal = () => {
  return (
    <div
      className="modal fade modal-custom-design"
      id="privacy-mode-switch"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="mt-4 mb-3 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <img src={privacyImage} alt="icon" />
              <h6 className="fw-bold my-2">Privacy Mode Enabled</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModeModal;
