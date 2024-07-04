import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import threeDots from "../../assets/images/icons/3-dots-verticle.svg";
import crossSettingsIcon from "../../assets/images/icons/cross-settings.svg";
import settingsIcon from "../../assets/images/icons/settings.svg";
import shoesImage from "../../assets/images/shoes.png";
// import userLoggedOut from "../../redux/features/auth/admin/adminSlice";
import { useSelector } from "react-redux";
import LanguageDropdown from "../../components/dropdown/LanguageDropdown";
import PrivacyModeModal from "./PrivacyModeModal";
import { handleMobileSidebar } from "./handleMobileSidebar";
import { handleSidebarSmall } from "./handleSidebarSmall";

const DashboardHeader = () => {
  const location = useLocation();
  const [lang, setLang] = useState("en");
  const prevSideBarMenu = useSelector(
    (state) => state?.settings?.prevSideBarMenu
  );

  const handleOnChange = (e) => {
    setLang(e.target.value);
  };

  const handleReportsSidebarClose = () => {
    const mainSection = document.querySelector(
      ".acnoo-dashboard-main-section.acnoo-reports-section"
    );
    mainSection?.classList?.remove("active");
  };

  return (
    <div
      className="dashboard-header print-d-none"
      onClick={handleReportsSidebarClose}
    >
      <button className="side-btn" onClick={() => handleMobileSidebar("0")}>
        <i className="fal fa-bars"></i>
      </button>
      <div className="dashboard-header-wrapper">
        <div className="header-left-side">
          <button className="sidebar-opner" onClick={handleSidebarSmall}>
            <i className="fal fa-bars" aria-hidden="true"></i>
          </button>
        </div>
        <div className="header-right-side">
          <ul className="header-menu">
            <li>
              <LanguageDropdown
                value={lang}
                handleOnChange={handleOnChange}
                className="w-150"
              />
            </li>
            <li className="privacy-mode d-flex align-items-center">
              <p className="me-2">Privacy</p>
              {/* <div
                className="form-check form-switch"
                data-bs-toggle="modal"
                data-bs-target="#privacy-mode-switch"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                />
              </div> */}
            </li>

            <li className="dropdown header-notification-dropdown">
              <div className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="far fa-bell"></i>
                <span>0</span>
              </div>
              <div className="dropdown-menu">
                <div className="border-bottom p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>Notifications</h4>
                    <img
                      src={threeDots}
                      alt="icon"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <ul>
                  {Array.from(Array(20)).map((_, index) => (
                    <li key={index}>
                      <div className="d-flex align-items-center">
                        <img src={shoesImage} alt="image" />
                        <div className="ms-3 w-100">
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <h6>Androw Cremer</h6>
                            <p className="time">23 Mins ago </p>
                          </div>
                          <p>
                            <small>Your due amount have been deposited </small>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="dropdown">
              {location.pathname.includes("settings") ? (
                <Link to={prevSideBarMenu || "/"} className="settings cross-bg">
                  <img src={crossSettingsIcon} alt="icon" />
                </Link>
              ) : (
                <Link to="/settings/profile" className="settings">
                  <img src={settingsIcon} alt="icon" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <PrivacyModeModal />
    </div>
  );
};

export default DashboardHeader;
