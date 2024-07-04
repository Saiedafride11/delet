import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminResendOtpMutation } from "../../redux/features/auth/admin/adminApi";
import { handleResponseErrorMessage } from "../function/handleResponseErrorMessage";
import Error from "../ui/Error/Error";
import SpinnerBorderSm from "../ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../ui/Toast/handleSuccessToast";

const OtpVerify = ({
  formValue,
  handleSubmit,
  setPageNumber,
  isLoading,
  error,
  setError,
  code,
  setCode,
}) => {
  const totalDuration = 5 * 60; // 5 minutes in seconds
  const [time, setTime] = useState(totalDuration);
  const [backgroundPercent, setBackgroundPercent] = useState("");

  const [
    adminResendOtp,
    {
      data: responseData,
      isLoading: resendOtpIsLoading,
      isSuccess,
      error: responseError,
    },
  ] = useAdminResendOtpMutation();

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Input Field Value Receive
  //-------------------------------------------------------------
  //-------------------------------------------------------------

  const handleInputPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newInputValues = pastedData.split("").slice(0, 6);
      setCode(newInputValues);
      focusNextInput(newInputValues.length);
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const updatedCode = [...code];
    if (value.length === 2) {
      updatedCode[index] = value.charAt(1);
    } else {
      updatedCode[index] = value;
    }

    setCode(updatedCode);
    focusNextInput(index + 1);
  };

  const focusNextInput = (index) => {
    const nextInput = document.getElementById(
      `verification-auto-complete-${index}`
    );
    if (nextInput) {
      nextInput.focus();
    }
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Timer
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const remainingTime = Math.max(0, prevTime - 1);

        const newCompletionPercentage = Math.round(
          ((totalDuration - remainingTime) / totalDuration) * 100
        );
        setBackgroundPercent(`radial-gradient(closest-side, #4875ff 79%, transparent 82% 100%),
                conic-gradient(#ed6254 ${newCompletionPercentage}%, white 0)`);

        if (remainingTime === 0) {
          clearInterval(timerInterval);
        }

        return remainingTime;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [totalDuration, isSuccess]);

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Resend otp
  //-------------------------------------------------------------
  //-------------------------------------------------------------

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setError("");
      setCode(["", "", "", "", "", ""]);
      setTime(totalDuration);
      handleSuccessToast(responseData?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleResendOtp = (e) => {
    e.preventDefault();
    adminResendOtp({
      email: formValue?.email,
    });
  };

  const handleClearState = () => {
    setPageNumber(1);
    setError("");
    setCode(["", "", "", "", "", ""]);
  };

  return (
    <div className="acnoo-login-container acnoo-login-verification">
      <div className="login-wrapper single-login-wrapper">
        <div className="right-side">
          <h2 className="fw-bold">Verification</h2>
          <h6>Please enter the OTP from your email</h6>
          <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-center gap-2 my-4">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  required
                  type="text"
                  className="form-control"
                  value={code[index] || ""}
                  onPaste={handleInputPaste}
                  onChange={(e) => handleInputChange(e, index)}
                  id={`verification-auto-complete-${index}`}
                />
              ))}
            </div>
            <div className="d-flex aligin-items-center justify-content-center mb-4">
              <div
                className="progress-bar"
                style={{ background: backgroundPercent }}
              >
                <h6 className="fw-bold text-white">{time} sec</h6>
                {/* <p>
              Time Remaining: {Math.floor(time / 60)}:
              {(time % 60).toString().padStart(2, "0")}
            </p> */}
              </div>
            </div>
            <p className="text-center my-3 text-white">
              Didn't receive code?{" "}
              <Link onClick={handleResendOtp} className="text-black">
                {resendOtpIsLoading ? "Loading........" : "Resend code"}
              </Link>
            </p>
            <div className="d-flex aligin-items-center justify-content-center gap-2">
              <button type="button" onClick={handleClearState}>
                Cancel
              </button>

              <button type="submit" disabled={isLoading}>
                {isLoading ? <SpinnerBorderSm /> : "Verify"}
              </button>
            </div>
          </form>
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
