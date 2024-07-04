import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import {
  useAdminProfileUpdateMutation,
  useGetBusinessCategoriesQuery,
} from "../../../../redux/features/auth/admin/adminApi";

const AdminSetupProfile = () => {
  const [formValue, setFormValue] = useState({
    business_category_id: "",
    business_name: "",
    balance: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: categories } = useGetBusinessCategoriesQuery();
  const [
    adminProfileUpdate,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminProfileUpdateMutation();

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setFormValue({
        business_category_id: "",
        business_name: "",
        balance: "",
      });
      navigate("/");
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData, navigate]);

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await adminProfileUpdate(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="acnoo-login-container">
      <div className="login-wrapper single-login-wrapper">
        <div className="right-side">
          <h2 className="fw-bold">Setup Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="business-category">Business Category *</label>
              <div className="input-wrapper pos-up-down-arrow">
                <select
                  className="form-control m-0"
                  required=""
                  name="business_category_id"
                  onChange={handleOnChange}
                >
                  <option value="" style={{ display: "none" }}>
                    Select Business Category
                  </option>
                  {categories?.data?.business_categories?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>

                <span></span>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="business-name">Company & Business Name *</label>
              <input
                id="business_name"
                type="text"
                name="business_name"
                required
                className="form-control"
                value={formValue?.business_name}
                placeholder="Enter company & business name"
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="balance">Opening Balance *</label>
              <input
                id="balance"
                type="number"
                name="balance"
                required
                className="form-control"
                value={formValue?.balance}
                placeholder="Enter balance"
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
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default AdminSetupProfile;
