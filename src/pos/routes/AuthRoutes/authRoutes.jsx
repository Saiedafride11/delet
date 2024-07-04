import AdminForgetPassword from "../../page/Login/Admin/AdminForgetPassword/AdminForgetPassword";
import AdminLogin from "../../page/Login/Admin/AdminLogin/AdminLogin";
import AdminRegister from "../../page/Login/Admin/AdminRegister/AdminRegister";
import AdminSetupProfile from "../../page/Login/Admin/AdminSetupProfile/AdminSetupProfile";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const authRoutes = [
  {
    path: "/admin-register",
    element: <AdminRegister />,
  },

  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-forger-password",
    element: <AdminForgetPassword />,
  },
  {
    path: "/profile-update",
    element: (
      <AdminPrivateRoute>
        <AdminSetupProfile />
      </AdminPrivateRoute>
    ),
  },
];
