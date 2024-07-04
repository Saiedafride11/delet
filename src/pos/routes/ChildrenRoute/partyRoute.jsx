import PartyDealer from "../../page/Party/PartyDealer/PartyDealer";
import PartyCreate from "../../page/Party/PartyList/PartyCreate";
import PartyList from "../../page/Party/PartyList/PartyList";
import PartyUpdate from "../../page/Party/PartyList/PartyUpdate";
import PartyRetailer from "../../page/Party/PartyRetailer/PartyRetailer";
import PartySupplier from "../../page/Party/PartySupplier/PartySupplier";
import PartyWholesaler from "../../page/Party/PartyWholesaler/PartyWholesaler";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const partyRoute = [
  {
    path: "/party",
    element: (
      <AdminPrivateRoute>
        <PartyList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/party/create",
    element: (
      <AdminPrivateRoute>
        <PartyCreate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/party/update/:partyId",
    element: (
      <AdminPrivateRoute>
        <PartyUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/party/retailer",
    element: (
      <AdminPrivateRoute>
        <PartyRetailer />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/party/supplier",
    element: (
      <AdminPrivateRoute>
        <PartySupplier />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/party/wholesaler",
    element: (
      <AdminPrivateRoute>
        <PartyWholesaler />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/party/dealer",
    element: (
      <AdminPrivateRoute>
        <PartyDealer />
      </AdminPrivateRoute>
    ),
  },
];
