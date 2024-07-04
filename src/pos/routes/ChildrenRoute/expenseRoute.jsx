import ExpenseCategoryList from "../../page/ExpenseList/ExpenseCategory/ExpenseCategoryList";
import ExpenseList from "../../page/ExpenseList/ExpenseList/ExpenseList";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const expenseRoute = [
  {
    path: "/expense",
    element: (
      <AdminPrivateRoute>
        <ExpenseList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/expense/category",
    element: (
      <AdminPrivateRoute>
        <ExpenseCategoryList />
      </AdminPrivateRoute>
    ),
  },
];
