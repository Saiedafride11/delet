import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../../../assets/images/icons/log-out.svg";
import resetPasswordIcon from "../../../../assets/images/icons/reset-password.svg";
import arrowIcon from "../../../../assets/images/icons/right-arrow-black.svg";
import userAvatarIcon from "../../../../assets/images/user-avatar.svg";
import { imageApiUrl } from "../../../../components/env/envApi";
import { getMonthDayYearFormat } from "../../../../components/function/getMonthDayYearFormat";
import { adminLoggedOut } from "../../../../redux/features/auth/admin/adminSlice";

const ProfileInfo = ({ adminData }) => {
  const { user_info: initialUserInfo } = adminData?.data;
  // const { data, error, isLoading, refetch } = useAdminSignOutQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = [
    {
      key: "Shop Name",
      value: initialUserInfo?.business?.name,
    },
    {
      key: "Owner name",
      value: initialUserInfo?.name,
    },
    {
      key: "Phone Number",
      value: initialUserInfo?.phone,
    },
    {
      key: "Address",
      value: initialUserInfo?.business?.business_address,
    },
    {
      key: "Email",
      value: initialUserInfo?.email,
    },
    {
      key: "Language",
      value: initialUserInfo?.lang,
    },
    {
      key: "Country",
      value: initialUserInfo?.business?.country?.name,
    },
    {
      key: "Opening Balance",
      value: `$${initialUserInfo?.business?.balance}`,
    },
    {
      key: "NID Verified",
      value: "No",
    },
    {
      key: "Plan Name",
      value: initialUserInfo?.business?.plan?.name,
    },
    {
      key: "Expire Date",
      value:
        initialUserInfo?.created_at !== null &&
        getMonthDayYearFormat(initialUserInfo?.created_at), // please update expire date
    },
    {
      key: "Registered Date",
      value:
        initialUserInfo?.created_at !== null &&
        getMonthDayYearFormat(initialUserInfo?.created_at),
    },
    {
      key: "Date of Birth",
      value:
        initialUserInfo?.dob !== null &&
        getMonthDayYearFormat(initialUserInfo?.dob),
    },
  ];

  const adminLogout = (e) => {
    e.preventDefault();
    // refetch();
    dispatch(adminLoggedOut());
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div className="acnoo-dashboard-details-wrapper settings-my-profile custom-form-control">
      <div className="details-header px-0">
        <div className="title mb-1">
          <h4>My Profile</h4>
        </div>
      </div>
      <div className="border rounded-1 p-3">
        <div className="d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <div className="image">
              <img
                src={
                  initialUserInfo?.business?.image?.length > 8
                    ? imageApiUrl + initialUserInfo?.business?.image
                    : userAvatarIcon
                }
                alt="user"
                className="w-100 h-100 object-fit-cover rounded-circle"
              />
            </div>
            <strong className="">{userData[0]?.value || "Shop Name"}</strong>
          </div>
        </div>
        <div>
          <h6 className="mt-4 fw-semibold">Personal Information:</h6>
          {userData?.map((data, index) => (
            <div key={index} className="profile-info">
              <h6>{data?.key}</h6>
              <span className="lh-1">:</span>
              <h6>
                <span>{data?.value || "N/A"}</span>
              </h6>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          onClick={() => navigate("/admin-forger-password")}
          className="profile-info-btn d-flex align-items-center justify-content-between gap-2"
        >
          <div className="d-flex align-items-center gap-2">
            <img src={resetPasswordIcon} alt="icon" />
            <p>Reset Password</p>
          </div>
          <img src={arrowIcon} alt="icon" />
        </div>
        <div
          onClick={adminLogout}
          className="profile-info-btn d-flex align-items-center justify-content-between gap-2"
        >
          <div className="d-flex align-items-center gap-2">
            <img src={logoutIcon} alt="icon" />
            <p>Log Out</p>
          </div>
          <img src={arrowIcon} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
