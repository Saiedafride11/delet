import StockTransferCreate from "../../page/Warehouse/StockTransferList/StockTransferCreate";
import StockTransferInvoice from "../../page/Warehouse/StockTransferList/StockTransferInvoice";
import StockTransferList from "../../page/Warehouse/StockTransferList/StockTransferList";
import StockTransferUpdate from "../../page/Warehouse/StockTransferList/StockTransferUpdate";
import WarehouseList from "../../page/Warehouse/WarehouseList/WarehouseList";
import WarehouseProductsList from "../../page/Warehouse/WarehouseProductsList/WarehouseProductsList";
import WarehousePurchaseList from "../../page/Warehouse/WarehousePurchaseList/WarehousePurchaseList";
import WarehouseSalesList from "../../page/Warehouse/WarehouseSalesList/WarehouseSalesList";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const warehouseRoute = [
  {
    path: "/warehouse",
    element: (
      <AdminPrivateRoute>
        <WarehouseList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/products/:warehouseId",
    element: (
      <AdminPrivateRoute>
        <WarehouseProductsList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/sales/:warehouseId",
    element: (
      <AdminPrivateRoute>
        <WarehouseSalesList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/purchase/:warehouseId",
    element: (
      <AdminPrivateRoute>
        <WarehousePurchaseList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/transfer",
    element: (
      <AdminPrivateRoute>
        <StockTransferList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/transfer/:stockTransferId",
    element: (
      <AdminPrivateRoute>
        <StockTransferUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/transfer/invoice/:stockTransferId",
    element: (
      <AdminPrivateRoute>
        <StockTransferInvoice />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/warehouse/transfer/create",
    element: (
      <AdminPrivateRoute>
        <StockTransferCreate />
      </AdminPrivateRoute>
    ),
  },
];
