import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hideIcon from "../../../../assets/images/icons/eye-hide.svg";
import showIcon from "../../../../assets/images/icons/eye-show.svg";
import loginLeftBg from "../../../../assets/images/login/left-bg.png";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminRegisterMutation } from "../../../../redux/features/auth/admin/adminApi";

const RegisterForm = ({
  formValue,
  setFormValue,
  error,
  setError,
  setPageNumber,
}) => {
  const [passwordShowOne, setPasswordShowOne] = useState(false);
  const [passwordShowTwo, setPasswordShowTwo] = useState(false);
  const [
    adminRegister,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminRegisterMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setFormValue({
        ...formValue,
        password: "",
        password_confirmation: "",
      });
      setPageNumber(2);
      setError("");
      handleSuccessToast(responseData?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

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
      adminRegister({
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
            <span>Create account</span>
          </h2>
          <h6>Let’s us know what your name, email, and your password</h6>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
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
            <div className="mt-3">
              <label htmlFor="password">Password</label>
              <div className="position-relative">
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  required
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
                  required
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
            <div className="checkbox-section">
              <label className="d-flex align-items-center">
                <input type="checkbox" name="remember" required />
                <span className="ms-2">
                  I agree &nbsp;
                  <Link to="" className="text-sky">
                    Terms of Condition &nbsp;
                  </Link>
                  &&nbsp;
                  <Link to="" className="text-sky">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-submit-btn"
            >
              {isLoading ? <SpinnerBorderSm /> : "Register"}
            </button>
          </form>
          <p className="text-center mt-3">
            Already Have an Account?&nbsp;
            <Link to="/admin-login" className="text-sky">
              Sign In
            </Link>
          </p>
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
