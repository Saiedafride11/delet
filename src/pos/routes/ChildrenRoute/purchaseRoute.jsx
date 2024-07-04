import PurchaseCreate from "../../page/Purchase/PurchaseList/PurchaseCreate";
import PurchaseInvoice from "../../page/Purchase/PurchaseList/PurchaseInvoice";
import PurchaseList from "../../page/Purchase/PurchaseList/PurchaseList";
import PurchaseUpdate from "../../page/Purchase/PurchaseList/PurchaseUpdate";
import PurchaseReturnCreate from "../../page/Purchase/PurchaseReturn/PurchaseReturnCreate";
import PurchaseReturnInvoice from "../../page/Purchase/PurchaseReturn/PurchaseReturnInvoice";
import PurchaseReturnList from "../../page/Purchase/PurchaseReturn/PurchaseReturnList";
import SalesReturnUpdate from "../../page/Purchase/PurchaseReturn/PurchaseReturnUpdate";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const purchaseRoute = [
  {
    path: "/purchase",
    element: (
      <AdminPrivateRoute>
        <PurchaseList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/create",
    element: (
      <AdminPrivateRoute>
        <PurchaseCreate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/update/:purchaseId",
    element: (
      <AdminPrivateRoute>
        <PurchaseUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/invoice/:invoiceId",
    element: (
      <AdminPrivateRoute>
        <PurchaseInvoice />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/return",
    element: (
      <AdminPrivateRoute>
        <PurchaseReturnList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/return/create/:purchaseId",
    element: (
      <AdminPrivateRoute>
        <PurchaseReturnCreate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/return/update/:purchaseReturnId",
    element: (
      <AdminPrivateRoute>
        <SalesReturnUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/purchase/return/invoice/:invoiceId",
    element: (
      <AdminPrivateRoute>
        <PurchaseReturnInvoice />
      </AdminPrivateRoute>
    ),
  },
];
