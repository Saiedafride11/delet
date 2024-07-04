import StockList from "../../page/StockList/StockList";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const stockRoute = [
  {
    path: "/stock",
    element: (
      <AdminPrivateRoute>
        <StockList />
      </AdminPrivateRoute>
    ),
  },
];
