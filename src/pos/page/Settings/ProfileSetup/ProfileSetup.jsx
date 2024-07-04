import React from "react";
import Error from "../../../components/ui/Error/Error";
import { useGetAdminInfoQuery } from "../../../redux/features/auth/admin/adminApi";
import ProfileInfo from "./component/ProfileInfo";
import ProfileUpdate from "./component/ProfileUpdate";

const ProfileSetup = () => {
  document.title = "Profile Setup";
  const { data: adminData, isLoading, isError } = useGetAdminInfoQuery();

  let content = null;

  if (isLoading) {
    content = (
      <div className="row">
        <div className="col-xl-5">
          <p className="placeholder-glow">
            <span className="placeholder col-12 vh-100"></span>
          </p>
        </div>
        <div className="col-xl-7">
          <p className="placeholder-glow">
            <span className="placeholder col-12 vh-100"></span>
          </p>
        </div>
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div className="vh-100 bg-white p-5">
        <Error message="There was an error!" />
      </div>
    );
  }
  if (!isLoading && !isError && adminData?.data?.user_info) {
    content = (
      <div className="row">
        <div className="col-xl-5">
          <ProfileInfo adminData={adminData} />
        </div>
        <div className="col-xl-7">
          <ProfileUpdate adminData={adminData} />
        </div>
      </div>
    );
  }
  return (
    <div className="acnoo-dashboard-main-section">
      <div className="acnoo-dashboard-wrapper">{content}</div>
    </div>
  );
};

export default ProfileSetup;
