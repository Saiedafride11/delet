import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/party", title: "all Parties" },
  { route: "/party/retailer", title: "retailer" },
  { route: "/party/supplier", title: "supplier" },
  { route: "/party/wholesaler", title: "wholesaler" },
  { route: "/party/dealer", title: "dealer" },
];

const PartyFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default PartyFilterTabs;
