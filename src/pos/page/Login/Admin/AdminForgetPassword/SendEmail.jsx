import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminResetOtpMutation } from "../../../../redux/features/auth/admin/adminApi";

const SendEmail = ({
  formValue,
  handleOnChange,
  setPageNumber,
  error,
  setError,
}) => {
  const [
    adminResetOtp,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminResetOtpMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setPageNumber(2);
      setError("");
      handleSuccessToast(responseData?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    adminResetOtp({
      email: formValue?.email,
    });
  };
  return (
    <div className="acnoo-login-container">
      <div className="login-wrapper single-login-wrapper">
        <div className="right-side">
          <h2 className="fw-bold">
            <span>Forgot password</span>
          </h2>
          <h6>Reset password by using your email</h6>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="form-control"
                value={formValue?.email}
                placeholder="Enter email"
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="login-submit-btn"
            >
              {isLoading ? <SpinnerBorderSm /> : "Continue"}
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/" className="text-black">
              Back to Home
            </Link>
          </div>
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
