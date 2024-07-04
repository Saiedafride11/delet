import SalesCreate from "../../page/Sales/SalesList/SalesCreate";
import SalesInvoice from "../../page/Sales/SalesList/SalesInvoice";
import SalesList from "../../page/Sales/SalesList/SalesList";
import SalesUpdate from "../../page/Sales/SalesList/SalesUpdate";
import SalesReturnCreate from "../../page/Sales/SalesReturn/SalesReturnCreate";
import SalesReturnInvoice from "../../page/Sales/SalesReturn/SalesReturnInvoice";
import SalesReturnList from "../../page/Sales/SalesReturn/SalesReturnList";
import SalesReturnUpdate from "../../page/Sales/SalesReturn/SalesReturnUpdate";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const salesRoute = [
  {
    path: "/sales",
    element: (
      <AdminPrivateRoute>
        <SalesList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/create",
    element: (
      <AdminPrivateRoute>
        <SalesCreate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/update/:salesId",
    element: (
      <AdminPrivateRoute>
        <SalesUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/invoice/:invoiceId",
    element: (
      <AdminPrivateRoute>
        <SalesInvoice />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/return",
    element: (
      <AdminPrivateRoute>
        <SalesReturnList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/return/create/:salesId",
    element: (
      <AdminPrivateRoute>
        <SalesReturnCreate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/return/update/:saleReturnId",
    element: (
      <AdminPrivateRoute>
        <SalesReturnUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/sales/return/invoice/:invoiceId",
    element: (
      <AdminPrivateRoute>
        <SalesReturnInvoice />
      </AdminPrivateRoute>
    ),
  },
];
