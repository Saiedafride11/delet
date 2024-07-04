import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpVerify from "../../../../components/common/OtpVerify";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminVerificationMutation } from "../../../../redux/features/auth/admin/adminApi";

const RegisterOtpVerification = ({
  formValue,
  code,
  setCode,
  error,
  setError,
  setPageNumber,
}) => {
  const { adminProfile } = useSelector((state) => state?.admin);

  const [
    adminVerification,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminVerificationMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setCode(["", "", "", "", "", ""]);
      navigate("/admin-login");
      setError("");
      handleSuccessToast(responseData?.message);
    }
  }, [responseError, isSuccess, responseData, navigate]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    adminVerification({
      email:
        adminProfile?.email === undefined
          ? formValue?.email
          : adminProfile?.email,
      otp: +code.join(""),
    });
  };

  return (
    <>
      <OtpVerify
        formValue={formValue}
        handleSubmit={handleOtpSubmit}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        setError={setError}
        error={error}
        code={code}
        setCode={setCode}
      />
    </>
  );
};

export default RegisterOtpVerification;
