import LossProfit from "../../page/LossProfit/LossProfit";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const lossProfitRoute = [
  {
    path: "/loss-profit",
    element: (
      <AdminPrivateRoute>
        <LossProfit />
      </AdminPrivateRoute>
    ),
  },
];
