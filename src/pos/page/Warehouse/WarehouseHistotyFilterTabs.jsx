import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const WarehouseHistoryFilterTabs = ({ warehouseId }) => {
  const filterTabs = [
    { route: `/warehouse/products/${warehouseId}`, title: "Product List" },
    { route: `/warehouse/sales/${warehouseId}`, title: "Sales History" },
    { route: `/warehouse/purchase/${warehouseId}`, title: "Purchase History" },
  ];
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default WarehouseHistoryFilterTabs;
