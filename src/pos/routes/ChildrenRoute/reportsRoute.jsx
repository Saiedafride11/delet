import DueCollectReports from "../../page/Reports/DueCollectReports/DueCollectReports";
import DueReports from "../../page/Reports/DueReports/DueReports";
import ExpenseReports from "../../page/Reports/ExpenseReports/ExpenseReports";
import IncomeReports from "../../page/Reports/IncomeReports/IncomeReports";
import LedgerDetailsReports from "../../page/Reports/LedgerDetailsReports/LedgerDetailsReports";
import LedgerReports from "../../page/Reports/LedgerReports/LedgerReports";
import LossProfitReports from "../../page/Reports/LossProfitReports/LossProfitReports";
import PurchaseReports from "../../page/Reports/PurchaseReports/PurchaseReports";
import PurchaseReturnReports from "../../page/Reports/PurchaseReturnReports/PurchaseReturnReports";
import SalesReports from "../../page/Reports/SalesReports/SalesReports";
import SalesReturnReports from "../../page/Reports/SalesReturnReports/SalesReturnReports";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const reportsRoute = [
  {
    path: "/reports",
    element: (
      <AdminPrivateRoute>
        <SalesReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/purchase",
    element: (
      <AdminPrivateRoute>
        <PurchaseReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/sales-return",
    element: (
      <AdminPrivateRoute>
        <SalesReturnReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/purchase-return",
    element: (
      <AdminPrivateRoute>
        <PurchaseReturnReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/loss-profit",
    element: (
      <AdminPrivateRoute>
        <LossProfitReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/due",
    element: (
      <AdminPrivateRoute>
        <DueReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/due-collection",
    element: (
      <AdminPrivateRoute>
        <DueCollectReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/ledger",
    element: (
      <AdminPrivateRoute>
        <LedgerReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/ledger/:ledgerId",
    element: (
      <AdminPrivateRoute>
        <LedgerDetailsReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/income",
    element: (
      <AdminPrivateRoute>
        <IncomeReports />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/reports/expense",
    element: (
      <AdminPrivateRoute>
        <ExpenseReports />
      </AdminPrivateRoute>
    ),
  },
];
