import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/income", title: "Income List" },
  { route: "/income/category", title: "Income Category" },
];

const IncomeFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default IncomeFilterTabs;
