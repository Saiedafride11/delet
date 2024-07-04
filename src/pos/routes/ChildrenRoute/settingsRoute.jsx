import PrintManagement from "../../page/Settings/PrintManagement/PrintManagement";
import ProductManagement from "../../page/Settings/ProductManagement/ProductManagement";
import ProfileSetup from "../../page/Settings/ProfileSetup/ProfileSetup";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const settingsRoute = [
  {
    path: "/settings/profile",
    element: (
      <AdminPrivateRoute>
        <ProfileSetup />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/settings/product-management",
    element: (
      <AdminPrivateRoute>
        <ProductManagement />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/settings/print",
    element: (
      <AdminPrivateRoute>
        <PrintManagement />
      </AdminPrivateRoute>
    ),
  },
];
