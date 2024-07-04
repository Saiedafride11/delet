import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import RegisterOtpVerification from "./RegisterOtpVerification";

const AdminRegister = () => {
  document.title = "Register";
  const [pageNumber, setPageNumber] = useState(1);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  return (
    <>
      {pageNumber === 1 && (
        <RegisterForm
          formValue={formValue}
          setFormValue={setFormValue}
          error={error}
          setError={setError}
          setPageNumber={setPageNumber}
        />
      )}
      {pageNumber === 2 && (
        <RegisterOtpVerification
          formValue={formValue}
          error={error}
          setError={setError}
          setPageNumber={setPageNumber}
          code={code}
          setCode={setCode}
        />
      )}
    </>
  );
};

export default AdminRegister;
