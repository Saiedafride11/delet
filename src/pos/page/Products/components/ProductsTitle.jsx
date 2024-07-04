import React from "react";
import { Link } from "react-router-dom";
import settingsGreyIcon from "../../../assets/images/icons/settings-grey-icon.svg";

const ProductsTitle = ({ title }) => {
  return (
    <div className="d-flex align-items-center justify-content-between mx-20">
      <h4>{title}</h4>
      <Link
        data-bs-toggle="offcanvas"
        data-bs-target="#add-product-settings-offcanvas"
        aria-controls="add-product-settings-offcanvas"
      >
        <img src={settingsGreyIcon} alt="icon" className="cursor-pointer" />
      </Link>
    </div>
  );
};

export default ProductsTitle;
