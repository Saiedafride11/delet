import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/warehouse", title: "Warehouse List" },
  { route: "/warehouse/transfer", title: "Stock Transfer List" },
];

const WarehouseFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default WarehouseFilterTabs;
