import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/expense", title: "Expense List" },
  { route: "/expense/category", title: "Expense Category" },
];

const ExpenseFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default ExpenseFilterTabs;
