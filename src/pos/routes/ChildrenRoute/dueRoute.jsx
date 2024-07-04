import DueInvoiceList from "../../page/Due/DueInvoiceList/DueInvoiceList";
import DuePurchaseSlipInvoice from "../../page/Due/DueInvoiceSlipList/Invoice/DuePurchaseSlipInvoice";
import DueSalesSlipInvoice from "../../page/Due/DueInvoiceSlipList/Invoice/DueSalesSlipInvoice";
import DueList from "../../page/Due/DueList/DueList";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const dueRoute = [
  {
    path: "/due",
    element: (
      <AdminPrivateRoute>
        <DueList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/due/invoice/:partyId",
    element: (
      <AdminPrivateRoute>
        <DueInvoiceList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/due/sale/slip/:slipId",
    element: (
      <AdminPrivateRoute>
        <DueSalesSlipInvoice />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/due/purchase/slip/:slipId",
    element: (
      <AdminPrivateRoute>
        <DuePurchaseSlipInvoice />
      </AdminPrivateRoute>
    ),
  },
];
