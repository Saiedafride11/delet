import Dashboard from "../../page/Dashboard/Dashboard";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const dashboardRoute = [
  {
    index: true,
    element: (
      <AdminPrivateRoute>
        <Dashboard />
      </AdminPrivateRoute>
    ),
  },
];
