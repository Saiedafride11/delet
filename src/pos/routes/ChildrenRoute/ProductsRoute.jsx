import ProductBrands from "../../page/Products/ProductBrands/ProductBrands";
import ProductCategories from "../../page/Products/ProductCategories/ProductCategories";
import ProductCreate from "../../page/Products/ProductList/ProductCreate";
import ProductList from "../../page/Products/ProductList/ProductList";
import ProductUpdate from "../../page/Products/ProductList/ProductUpdate";
import ProductModel from "../../page/Products/ProductModel/ProductModel";
import ProductUnits from "../../page/Products/ProductUnits/ProductUnits";
import ProductWarranty from "../../page/Products/ProductWarranty/ProductWarranty";
import ProductCapacity from "../../page/Products/Variation/ProductCapacity";
import ProductColor from "../../page/Products/Variation/ProductColor";
import ProductSize from "../../page/Products/Variation/ProductSize";
import ProductType from "../../page/Products/Variation/ProductType";
import ProductWeight from "../../page/Products/Variation/ProductWeight";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

export const productsRoute = [
  {
    path: "/products",
    element: (
      <AdminPrivateRoute>
        <ProductList />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/products/create",
    element: (
      <AdminPrivateRoute>
        <ProductCreate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/products/update/:productId",
    element: (
      <AdminPrivateRoute>
        <ProductUpdate />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/products/category",
    element: (
      <AdminPrivateRoute>
        <ProductCategories />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/brand",
    element: (
      <AdminPrivateRoute>
        <ProductBrands />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/model",
    element: (
      <AdminPrivateRoute>
        <ProductModel />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/units",
    element: (
      <AdminPrivateRoute>
        <ProductUnits />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/warranty",
    element: (
      <AdminPrivateRoute>
        <ProductWarranty />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/color",
    element: (
      <AdminPrivateRoute>
        <ProductColor />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/size",
    element: (
      <AdminPrivateRoute>
        <ProductSize />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/weight",
    element: (
      <AdminPrivateRoute>
        <ProductWeight />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/capacity",
    element: (
      <AdminPrivateRoute>
        <ProductCapacity />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "products/type",
    element: (
      <AdminPrivateRoute>
        <ProductType />
      </AdminPrivateRoute>
    ),
  },
];
