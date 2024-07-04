import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/purchase", title: "Purchase List" },
  { route: "/purchase/return", title: "Purchase Return" },
];

const PurchaseFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default PurchaseFilterTabs;
