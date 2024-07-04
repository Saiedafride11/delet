import React from "react";
import { useSelector } from "react-redux";
import logoImage from "../../../assets/images/logo.svg";
import { imageApiUrl } from "../../env/envApi";

const StoreInfo = () => {
  const loginUser = useSelector((state) => state?.admin?.adminProfile);

  const logoUrl =
    loginUser?.image?.length > 8 ? imageApiUrl + loginUser?.image : logoImage;

  return (
    <div className="heading d-flex justify-content-between">
      <div className="h-80">
        <img src={logoUrl} alt="logo" className="h-100" />
      </div>
      <div className="store-name text-end">
        <h2>{loginUser?.business?.name || "N/A"}</h2>
        <p>Mobile : {loginUser?.phone || "N/A"}</p>
        <p>Shop : {loginUser?.business?.business_address || "N/A"}</p>
        <p>Email: {loginUser?.email || "example@gmail.com"}</p>
      </div>
    </div>
  );
};

export default StoreInfo;
