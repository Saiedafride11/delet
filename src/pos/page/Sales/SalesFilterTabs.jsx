import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/sales", title: "Sales List" },
  { route: "/sales/return", title: "Sales Return" },
  // { route: "/sales/quotation", title: "Quotation LIST" },
  // { route: "/sales/loan", title: "Loan Sale" },
];

const SalesFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default SalesFilterTabs;
