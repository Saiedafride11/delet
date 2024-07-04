import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const { adminToken } = useSelector((state) => state.admin);
  const localAdminToken = localStorage?.getItem("adminToken");

  const isLoggedIn = adminToken || localAdminToken;
  return isLoggedIn ? children : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;
