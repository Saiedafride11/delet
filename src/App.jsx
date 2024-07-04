import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import "./pos/assets/css/bootstrap.min.css";
import "./pos/assets/css/style.css";
import "./pos/assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "./pos/assets/js/bootstrap.bundle.min.js";

import { useDispatch } from "react-redux";
import BaseColorSpinner from "./pos/components/ui/Spinner/BaseColorSpinner";
import { handleNoInternetConnection } from "./pos/components/ui/Toast/handleNoInternetConnection.jsx";
import useAdminAuthCheck from "./pos/hooks/useAdminAuthCheck";
import DashboardLayout from "./pos/layout/DashboardLayout";
import EcommerceLayout from "./pos/layout/EcommerceLayout";
import { apiSlice } from "./pos/redux/api/apiSlice.jsx";

function App() {
  const adminAuthChecked = useAdminAuthCheck();
  const [dashboardLayout, setDashboardLayout] = useState(true);
  const [preloader, setPreloader] = useState(true);
  const [online, setOnline] = useState(navigator.onLine);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 100);
  }, []);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnline(navigator.onLine);

      const retryButton = document.querySelector(".swal2-deny");
      if (retryButton && retryButton.textContent.trim() === "Retry") {
        const swalContainer = document.querySelector(".swal2-container");
        swalContainer.style.display = "none";
      }
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  // input type number, mouse wheel disable
  useEffect(() => {
    const disableWheel = (e) => {
      e.target.type === "number" && e.preventDefault();
    };

    document.addEventListener("wheel", disableWheel, { passive: false });

    return () => document.removeEventListener("wheel", disableWheel);
  }, []);

  //when login, then all api refresh
  const localAuth = localStorage?.getItem("adminToken");
  useEffect(() => {
    if (localAuth) {
      setTimeout(() => {
        dispatch(apiSlice.util.resetApiState());
      }, 500);
    }
  }, [localAuth]);

  return online ? (
    preloader || !adminAuthChecked ? (
      <BaseColorSpinner />
    ) : (
      <>
        <ToastContainer draggable="mouse" />
        {dashboardLayout ? <DashboardLayout /> : <EcommerceLayout />}
      </>
    )
  ) : (
    handleNoInternetConnection()
  );
}

export default App;
