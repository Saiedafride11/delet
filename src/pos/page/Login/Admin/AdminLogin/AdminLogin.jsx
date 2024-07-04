import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hideIcon from "../../../../assets/images/icons/eye-hide.svg";
import showIcon from "../../../../assets/images/icons/eye-show.svg";
import loginLeftBg from "../../../../assets/images/login/left-bg.png";
import { getEmailWithCookie } from "../../../../components/function/getEmailWithCookie";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import { setEmailWithCookie } from "../../../../components/function/setEmailWithCookie";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminLoginMutation } from "../../../../redux/features/auth/admin/adminApi";

const AdminLogin = () => {
  document.title = "Login";
  const [passwordShow, setPasswordShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [
    adminLogin,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminLoginMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setFormValue({
        email: "",
        password: "",
      });
      responseData?.data?.business === null
        ? navigate("/profile-update")
        : navigate("/");
      setError("");
      handleSuccessToast(responseData?.message);
    }
  }, [responseError, isSuccess, responseData, navigate]);

  useEffect(() => {
    const storedRememberMe = getEmailWithCookie("rememberMe");
    const storedEmail = getEmailWithCookie("rememberedEmail");

    if (storedRememberMe === "true" && storedEmail) {
      setFormValue({ ...formValue, email: storedEmail });
      setRememberMe(true);
    }
  }, []);

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin({
      email: formValue?.email,
      password: formValue?.password,
    });

    if (rememberMe) {
      setEmailWithCookie("rememberedEmail", formValue?.email, 7); // Expires in 7 days
      setEmailWithCookie("rememberMe", "true", 7);
    } else {
      setEmailWithCookie("rememberedEmail", "", -1);
      setEmailWithCookie("rememberMe", "", -1);
    }
  };
  return (
    <div className="acnoo-login-container">
      <div className="login-wrapper custom-login-wrapper">
        <div className="d-flex align-items-center justify-content-center left-side">
          <img src={loginLeftBg} alt="image" className="w-100" />
        </div>
        <div className="right-side">
          <h2>
            Welcome to <span className="fw-bold">Acnoo Pos</span>
          </h2>
          <h6>Please login in to your account</h6>
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
                  type={passwordShow ? "text" : "password"}
                  onChange={handleOnChange}
                />
                <span
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="position-absolute top-50 end-0 translate-middle-y cursor-pointer pe-3"
                >
                  {passwordShow ? (
                    <img src={showIcon} alt="icon" />
                  ) : (
                    <img src={hideIcon} alt="icon" />
                  )}
                </span>
              </div>
            </div>
            <div className="checkbox-section">
              <label className="d-flex align-items-center mt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="ms-2">Remember me</span>
              </label>
              <Link to="/admin-forger-password">Forgot Password</Link>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="login-submit-btn"
            >
              {isLoading ? <SpinnerBorderSm /> : "Login"}
            </button>
          </form>
          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/admin-register" className="text-sky">
              Register
            </Link>
          </p>
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
