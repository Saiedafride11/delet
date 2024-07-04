import React, { useEffect, useState } from "react";
import uploaderImage from "../../../../assets/images/icons/upload-icon.svg";
import LanguageDropdown from "../../../../components/dropdown/LanguageDropdown";
import { imageApiUrl } from "../../../../components/env/envApi";
import { handleResponseErrorMessage } from "../../../../components/function/handleResponseErrorMessage";
import Error from "../../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { useAdminProfileUpdateMutation } from "../../../../redux/features/auth/admin/adminApi";
import BusinessCategory from "./BusinessCategory";
import CountryList from "./CountryList";

const ProfileUpdate = ({ adminData }) => {
  const { user_info: initialUserInfo } = adminData?.data;
  const prevImageDefault =
    initialUserInfo?.business?.image?.length > 8
      ? imageApiUrl + initialUserInfo?.business?.image
      : uploaderImage;

  const [formValue, setFormValue] = useState({
    name: initialUserInfo?.name || "",
    business_name: initialUserInfo?.business?.name || "",
    business_address: initialUserInfo?.business?.business_address || "",
    business_category_id:
      initialUserInfo?.business?.business_category?.id || "",
    image: null,
    phone: initialUserInfo?.phone || "",
    email: initialUserInfo?.email || "",
    balance: initialUserInfo?.business?.balance || "",
    lang: initialUserInfo?.lang || "",
    dob: initialUserInfo?.dob || "",
    country_code: initialUserInfo?.business?.country?.alpha3_code || "",
  });
  const [error, setError] = useState("");
  const [prevImage, setPrevImage] = useState(prevImageDefault);

  const [
    adminProfileUpdate,
    { data: responseData, isLoading, isSuccess, error: responseError },
  ] = useAdminProfileUpdateMutation();

  //-----------------------------------------------
  //-----------------------------------------------
  // Input Value Received
  //-----------------------------------------------
  //-----------------------------------------------
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[field] = value;
    setFormValue(newFormValue);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setPrevImage(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
    setFormValue({ ...formValue, image: file });
  };

  //-----------------------------------------------
  //-----------------------------------------------
  // Profile Update
  //-----------------------------------------------
  //-----------------------------------------------
  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (formValue?.dob !== "") {
      const dobDate = new Date(formValue?.dob).toLocaleDateString("en-GB");
      formData.append("dob", dobDate);
    }

    try {
      const response = await adminProfileUpdate(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // console.log("formValue", formValue);

  return (
    <div className="acnoo-dashboard-details-wrapper custom-form-control">
      <div className="details-header px-0">
        <div className="title">
          <h4>Update Profile</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-1 custom-focus-label mb-20">
          <BusinessCategory
            initialKey="business_category_id"
            initialValue={formValue?.business_category_id}
            setFormValue={setFormValue}
          />
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="text"
            id="company_name"
            name="business_name"
            className="form-control"
            placeholder="Enter shop name"
            value={formValue?.business_name}
            onChange={handleOnChange}
          />
          <label htmlFor="company_name">Company Shop Name</label>
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="text"
            id="username"
            name="name"
            className="form-control"
            placeholder="Enter owner name"
            value={formValue?.name}
            onChange={handleOnChange}
          />
          <label htmlFor="username">Shop owner name</label>
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="number"
            id="number"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
            value={formValue?.phone}
            onChange={handleOnChange}
          />
          <label htmlFor="number">Phone Number</label>
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="text"
            id="business_address"
            name="business_address"
            className="form-control"
            placeholder="Enter business address"
            value={formValue?.business_address}
            onChange={handleOnChange}
          />
          <label htmlFor="business_address">Address</label>
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter email address"
            value={formValue?.email}
            onChange={handleOnChange}
          />
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="custom-focus-label mb-20">
          <label>Language</label>
          <LanguageDropdown
            value={formValue?.lang}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="custom-focus-label mb-20">
          <CountryList
            initialKey="country_code"
            initialValue={formValue?.country_code}
            setFormValue={setFormValue}
          />
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="number"
            id="balance"
            name="balance"
            className="form-control"
            placeholder="Enter opening balance"
            value={formValue?.balance}
            onChange={handleOnChange}
          />
          <label htmlFor="balance">Opening Balance</label>
        </div>
        <div className="custom-focus-label mb-20">
          <input
            type="date"
            id="date-of-birth"
            name="dob"
            className="form-control"
            value={formValue?.dob}
            onChange={(e) =>
              setFormValue({ ...formValue, dob: e.target.value })
            }
          />
          <label htmlFor="date-of-birth">Date of Birth</label>
        </div>
        <div className="position-relative">
          <label className="upload-img-top-label">Image</label>
          <div className="upload-img-v2">
            <label className="upload-v4 dashed-border">
              <div className="img-wrp">
                <img src={prevImage} alt="user" id="image" />
              </div>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="d-none"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div className="pt-4 mt-3 text-center">
          <button
            disabled={isLoading}
            type="submit"
            className="btn save-btn w-120"
          >
            {isLoading ? <SpinnerBorderSm /> : "Update"}
          </button>
        </div>
      </form>
      {error !== "" && <Error message={error} />}
    </div>
  );
};

export default ProfileUpdate;
