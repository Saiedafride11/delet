import React, { useState } from "react";

import OtpVerification from "./OtpVerification";
import SendEmail from "./SendEmail";
import SetNewPassword from "./SetNewPassword";

const AdminForgetPassword = () => {
  document.title = "Reset Password";
  const [pageNumber, setPageNumber] = useState(1);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

  return (
    <>
      {pageNumber === 1 && (
        <SendEmail
          formValue={formValue}
          setPageNumber={setPageNumber}
          handleOnChange={handleOnChange}
          error={error}
          setError={setError}
        />
      )}
      {pageNumber === 2 && (
        <OtpVerification
          formValue={formValue}
          setPageNumber={setPageNumber}
          error={error}
          setError={setError}
          code={code}
          setCode={setCode}
        />
      )}
      {pageNumber === 3 && (
        <SetNewPassword
          formValue={formValue}
          setFormValue={setFormValue}
          error={error}
          setError={setError}
          setCode={setCode}
          handleOnChange={handleOnChange}
        />
      )}
    </>
  );
};

export default AdminForgetPassword;
