import React from "react";
import TableTopFilterTabs from "../../components/common/TableTopFilterTabs";

const filterTabs = [
  { route: "/products", title: "Product List" },
  { route: "/products/category", title: "Category" },
  { route: "/products/brand", title: "Brand" },
  { route: "/products/model", title: "Model" },
  { route: "/products/units", title: "Units" },
  { route: "/products/warranty", title: "Warranty" },
  { route: "/products/color", title: "Color" },
  { route: "/products/size", title: "Size" },
  { route: "/products/weight", title: "Weight" },
  { route: "/products/capacity", title: "Capacity" },
  { route: "/products/type", title: "Type" },
];

const ProductsFilterTabs = () => {
  return <TableTopFilterTabs filterTabs={filterTabs} />;
};

export default ProductsFilterTabs;
