import IncomeCategoryList from "../../page/IncomeList/IncomeCategory/IncomeCategoryList";
import IncomeList from "../../page/IncomeList/IncomeList/IncomeList";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const incomeRoute = [
  {
    path: "/income",
    element: (
      <AdminPrivateRoute>
        <IncomeList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/income/category",
    element: (
      <AdminPrivateRoute>
        <IncomeCategoryList />
      </AdminPrivateRoute>
    ),
  },
];
