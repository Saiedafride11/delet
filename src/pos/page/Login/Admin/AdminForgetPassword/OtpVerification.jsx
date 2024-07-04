import React, { useEffect } from "react";
import OtpVerify from "../../../../components/common/OtpVerify";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminResetVerificationMutation } from "../../../../redux/features/auth/admin/adminApi";

const OtpVerification = ({
  formValue,
  setPageNumber,
  error,
  setError,
  code,
  setCode,
}) => {
  const [
    adminResetVerification,
    {
      data: otpData,
      isLoading: otpIsLoading,
      isSuccess: otpIsSuccess,
      error: otpResponseError,
    },
  ] = useAdminResetVerificationMutation();

  useEffect(() => {
    if (otpResponseError !== undefined) {
      handleResponseErrorMessage(otpResponseError, setError);
    } else if (otpIsSuccess) {
      setPageNumber(3);
      setError("");
      handleSuccessToast(otpData?.message);
    }
  }, [otpResponseError, otpIsSuccess, otpData]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    adminResetVerification({
      email: formValue?.email,
      otp: +code.join(""),
    });
  };

  return (
    <>
      <OtpVerify
        formValue={formValue}
        handleSubmit={handleOtpSubmit}
        setPageNumber={setPageNumber}
        isLoading={otpIsLoading}
        setError={setError}
        error={error}
        code={code}
        setCode={setCode}
      />
    </>
  );
};

export default OtpVerification;
