import React from "react";
import blankImage from "../../../../../assets/images/icons/blank-grey.svg";

const RegularPrinterFooter = () => {
  return (
    <div>
      <h6 className="pt-3 mb-3 fw-semibold">Footer</h6>
      <div className="d-flex align-items-center mb-3">
        <input type="checkbox" id="signature_of_customer" />
        <label className="settings-label" htmlFor="signature_of_customer">
          Signature of customer
        </label>
        <img src={blankImage} alt="icon" className="ms-1 w-16" />
      </div>
      <div className="d-flex align-items-center mb-3">
        <input type="checkbox" />

        <div className="custom-focus-label">
          <input
            type="text"
            id="author_signature_text"
            name="author_signature_text"
            className="form-control ms-2 w-100"
            placeholder="Author Signature Text"
          />
          <label htmlFor="author_signature_text" className="left-15">
            Author Signature Text
          </label>
        </div>

        <div className="d-flex align-items-center">
          <img src={blankImage} alt="icon" className="ms-3 w-16" />
          <small className="text-sky ms-2">Change</small>
        </div>
      </div>
      <div className="d-flex align-items-center mb-3">
        <input type="checkbox" id="payment_mode" />
        <label className="settings-label" htmlFor="payment_mode">
          Payment Mode
        </label>
        <img src={blankImage} alt="icon" className="ms-1 w-16" />
      </div>
      <div className="d-flex align-items-center mb-3">
        <input type="checkbox" />
        <div className="custom-focus-label w-94-percent">
          <input
            type="text"
            id="message_title"
            name="message_title"
            className="form-control ms-2 w-100"
            placeholder="Message title"
          />
          <label htmlFor="message_title" className="left-15">
            Message Title
          </label>
        </div>
        <img src={blankImage} alt="icon" className="ms-3 w-16" />
      </div>
      <div className="d-flex align-items-center mb-3">
        <input type="checkbox" />
        <div className="custom-focus-label w-94-percent">
          <textarea
            id="message_body"
            name="message_body"
            className="form-control ms-2 w-100"
            placeholder="Message body"
            rows="1"
          ></textarea>
          <label htmlFor="message_body" className="left-15">
            Message Body
          </label>
        </div>
        <img src={blankImage} alt="icon" className="ms-3 w-16" />
      </div>
    </div>
  );
};

export default RegularPrinterFooter;
