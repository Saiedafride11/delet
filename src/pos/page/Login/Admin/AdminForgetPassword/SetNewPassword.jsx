import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hideIcon from "../../../../assets/images/icons/eye-hide.svg";
import showIcon from "../../../../assets/images/icons/eye-show.svg";
import loginLeftBg from "../../../../assets/images/login/left-bg.png";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminResetPasswordMutation } from "../../../../redux/features/auth/admin/adminApi";

const SetNewPassword = ({
  formValue,
  setFormValue,
  error,
  setError,
  setCode,
  handleOnChange,
}) => {
  const [passwordShowOne, setPasswordShowOne] = useState(false);
  const [passwordShowTwo, setPasswordShowTwo] = useState(false);
  const navigate = useNavigate();

  const [
    adminResetPassword,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminResetPasswordMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setFormValue({
        password: "",
        password_confirmation: "",
      });
      setCode(["", "", "", "", "", ""]);
      setError("");
      navigate("/");
      handleSuccessToast(responseData?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formValue?.password?.length < 6 ||
      formValue?.password_confirmation?.length < 6
    ) {
      setError("Password must be at least 6 characters");
    } else if (formValue?.password !== formValue?.password_confirmation) {
      setError("Passwords do not match");
    } else {
      adminResetPassword({
        email: formValue?.email,
        password: formValue?.password,
        password_confirmation: formValue?.password_confirmation,
      });
    }
  };
  return (
    <div className="acnoo-login-container">
      <div className="login-wrapper custom-login-wrapper">
        <div className="d-flex align-items-center justify-content-center left-side">
          <img src={loginLeftBg} alt="image" className="w-100" />
        </div>
        <div className="right-side">
          <h2 className="fw-bold">
            <span>Reset Password</span>
          </h2>
          <h6>Let’s us know what your new password</h6>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <div className="position-relative">
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter passwords"
                  value={formValue?.password}
                  type={passwordShowOne ? "text" : "password"}
                  onChange={handleOnChange}
                />
                <span
                  onClick={() => setPasswordShowOne(!passwordShowOne)}
                  className="position-absolute top-50 end-0 translate-middle-y cursor-pointer pe-3"
                >
                  {passwordShowOne ? (
                    <img src={showIcon} alt="icon" />
                  ) : (
                    <img src={hideIcon} alt="icon" />
                  )}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <div className="position-relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  className="form-control"
                  placeholder="Enter password confirm"
                  value={formValue?.password_confirmation}
                  type={passwordShowTwo ? "text" : "password"}
                  onChange={handleOnChange}
                />
                <span
                  onClick={() => setPasswordShowTwo(!passwordShowTwo)}
                  className="position-absolute top-50 end-0 translate-middle-y cursor-pointer pe-3"
                >
                  {passwordShowTwo ? (
                    <img src={showIcon} alt="icon" />
                  ) : (
                    <img src={hideIcon} alt="icon" />
                  )}
                </span>
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="login-submit-btn"
            >
              {isLoading ? <SpinnerBorderSm /> : "Submit"}
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

export default SetNewPassword;
